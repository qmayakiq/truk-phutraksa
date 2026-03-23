"use client";

import { useState, useEffect } from "react";
import { Edit2, Save, Plus, Trash2, Eye } from "lucide-react";

const defaultData = {
  stats: [
    { id: 1, label: "รถที่จำหน่าย", value: "150+" },
    { id: 2, label: "ลูกค้าทั่วประเทศ", value: "20+" },
    { id: 3, label: "ประสบการณ์", value: "10+" },
  ],
  products: [
    { id: 1, name: "รถบรรทุกขยะแบบอัดท้าย 6 ล้อ", specs: ["ความจุ 6 ลูกบาศก์เมตร", "ระบบไฮดรอลิก", "ตัวถังแข็งแรง"], price: "ติดต่อ" },
    { id: 2, name: "รถบรรทุกขยะแบบเทท้าย 8 ล้อ", specs: ["ความจุ 8 ลูกบาศก์เมตร", "ระบบเทอัตโนมัติ", "เหมาะกับขยะอ่อน"], price: "ติดต่อ" },
  ],
  portfolio: [
    { id: 1, title: "รถบรรทุกขยะ 6 ล้อ", client: "เทศบาลนครหาดใหญ่", image: "/images/portfolio/project1.jpg" },
    { id: 2, title: "รถอัดขยะ 10 ล้อ", client: "บริษัท ขยะสะอาด จำกัด", image: "/images/portfolio/project2.jpg" },
  ],
  clients: ["เทศบาลนครเชียงใหม่", "อบต.บางพลี", "เทศบาลเมืองภูเก็ต", "เทศบาลนครขอนแก่น", "อบจ.สุราษฎร์ธานี", "เทศบาลนครนครราชสีมา"],
};

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("settings");

  useEffect(() => {
    fetch("/admin/api/save-data")
      .then((res) => res.json())
      .then((result) => {
        // ตรวจสอบและเพิ่ม settings ถ้ายังไม่มีในฐานข้อมูลเก่า
        if (!result.settings) {
          result.settings = { heroBackground: "" };
        }
        setData(result);
      })
      .catch(() => setData(defaultData))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (section: string, id: number, field: string, value: any) => {
    setData((prev: any) => {
      // จัดการกรณีเป็น settings ซึ่งไม่ใช่ array
      if (section === "settings") {
        return {
          ...prev,
          settings: {
            ...prev.settings,
            [field]: value
          }
        };
      }
      
      return {
        ...prev,
        [section]: prev[section].map((item: any) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      };
    });
  };

  const handleSettingImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for background
        alert("ขนาดไฟล์ใหญ่เกินไป กรุณาอัปโหลดรูปภาพขนาดไม่เกิน 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleEdit("settings", 0, "heroBackground", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (section: string, id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        alert("ขนาดไฟล์ใหญ่เกินไป กรุณาอัปโหลดรูปภาพขนาดไม่เกิน 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleEdit(section, id, "image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (section: string) => {
    const id = Date.now();
    const items: any = {
      stats: { id, label: "ใหม่", value: "0+" },
      products: { id, name: "สินค้าใหม่", specs: ["สเปคใหม่"], price: "ติดต่อ" },
      portfolio: { id, title: "โครงการใหม่", client: "ลูกค้าใหม่", image: "/images/portfolio/new.jpg" },
      clients: "ลูกค้าใหม่",
    };
    setData((prev: any) => ({
      ...prev,
      [section]: [...prev[section], items[section]],
    }));
  };

  const handleDelete = (section: string, id: number) => {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== id),
    }));
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const response = await fetch("/admin/api/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        alert("บันทึกข้อมูลเรียบร้อย!");
      } else {
        alert("บันทึกข้อมูลไม่สำเร็จ");
      }
    } catch {
      alert("บันทึกข้อมูลไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-bg flex items-center justify-center">
        <div className="text-lg text-gray-medium">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-bg p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-gray-medium">จัดการข้อมูลเว็บไซต์ TRUK Phutraksa</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </button>
            <a href="/" className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-dark px-6 py-2 rounded-lg font-semibold transition-colors">
              <Eye className="w-4 h-4" />
              ดูเว็บไซต์
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "settings", label: "ตั้งค่าทั่วไป" },
              { key: "stats", label: "สถิติ" },
              { key: "products", label: "สินค้า" },
              { key: "portfolio", label: "ผลงาน" },
              { key: "clients", label: "ลูกค้า" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key ? "bg-primary text-white" : "bg-gray-bg text-gray-dark hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === "settings" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">ตั้งค่าทั่วไป</h2>
              </div>
              <div className="space-y-6">
                <div className="p-4 border border-gray-light rounded-lg">
                  <h3 className="font-bold text-foreground mb-4">รูปภาพพื้นหลังส่วนบนสุด (Hero Section)</h3>
                  <div className="space-y-4">
                    {data.settings?.heroBackground ? (
                      <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-light mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={data.settings.heroBackground} 
                          alt="Hero Background" 
                          className="w-full h-full object-cover"
                        />
                        <button 
                          onClick={() => handleEdit("settings", 0, "heroBackground", "")}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                          title="ลบรูปภาพ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="h-48 w-full rounded-lg bg-[#0f3460] flex items-center justify-center border border-gray-light mb-4 opacity-50 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)' }}></div>
                        <span className="text-white relative z-10">ใช้พื้นหลังสีน้ำเงินเริ่มต้น</span>
                      </div>
                    )}
                    
                    <div className="space-y-2 border border-gray-light p-3 rounded-lg bg-gray-50">
                      <label className="block text-sm font-medium text-gray-dark">อัปโหลดรูปภาพใหม่</label>
                      <input type="text" value={data.settings?.heroBackground || ""} onChange={(e) => handleEdit("settings", 0, "heroBackground", e.target.value)} className="w-full px-3 py-2 border border-gray-light rounded-lg outline-none mb-2 bg-white" placeholder="URL รูปภาพ (หรืออัปโหลดด้านล่าง)" />
                      <div className="text-sm text-gray-medium text-center my-2">หรือ</div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleSettingImageUpload} 
                        className="w-full text-sm text-gray-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                      />
                      {data.settings?.heroBackground?.startsWith('data:image') && (
                        <p className="text-xs text-green-600 mt-1">อัปโหลดรูปภาพสำเร็จ (Base64)</p>
                      )}
                      <p className="text-xs text-gray-medium mt-2">คำแนะนำ: ควรใช้รูปภาพแนวนอนขนาดใหญ่ (เช่น 1920x1080) เพื่อความคมชัด</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">จัดการสถิติ</h2>
                <button onClick={() => handleAdd("stats")} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  <Plus className="w-4 h-4" /> เพิ่มสถิติ
                </button>
              </div>
              <div className="space-y-4">
                {data.stats.map((stat: any) => (
                  <div key={stat.id} className="flex items-center gap-4 p-4 border border-gray-light rounded-lg">
                    {editing === `stats-${stat.id}` ? (
                      <div className="flex items-center gap-4 flex-1">
                        <input type="text" value={stat.label} onChange={(e) => handleEdit("stats", stat.id, "label", e.target.value)} className="flex-1 px-3 py-2 border border-gray-light rounded-lg outline-none" />
                        <input type="text" value={stat.value} onChange={(e) => handleEdit("stats", stat.id, "value", e.target.value)} className="w-24 px-3 py-2 border border-gray-light rounded-lg outline-none" />
                        <button onClick={() => setEditing(null)} className="p-2 text-gray-medium hover:text-primary"><Save className="w-5 h-5" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{stat.label}</div>
                          <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        </div>
                        <button onClick={() => setEditing(`stats-${stat.id}`)} className="p-2 text-gray-medium hover:text-primary"><Edit2 className="w-5 h-5" /></button>
                        <button onClick={() => handleDelete("stats", stat.id)} className="p-2 text-gray-medium hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">จัดการสินค้า</h2>
                <button onClick={() => handleAdd("products")} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  <Plus className="w-4 h-4" /> เพิ่มสินค้า
                </button>
              </div>
              <div className="space-y-4">
                {data.products.map((product: any) => (
                  <div key={product.id} className="p-4 border border-gray-light rounded-lg">
                    {editing === `products-${product.id}` ? (
                      <div className="space-y-4">
                        <input type="text" value={product.name} onChange={(e) => handleEdit("products", product.id, "name", e.target.value)} className="w-full px-3 py-2 border border-gray-light rounded-lg outline-none font-bold" />
                        <textarea 
                          value={product.specs.join('\n')} 
                          onChange={(e) => handleEdit("products", product.id, "specs", e.target.value.split('\n'))}
                          className="w-full px-3 py-2 border border-gray-light rounded-lg outline-none min-h-[100px]"
                          placeholder="สเปค (บรรทัดละ 1 ข้อ)"
                        />
                        <input type="text" value={product.price} onChange={(e) => handleEdit("products", product.id, "price", e.target.value)} className="w-full px-3 py-2 border border-gray-light rounded-lg outline-none" placeholder="ราคา" />
                        
                        <div className="space-y-2 border border-gray-light p-3 rounded-lg">
                          <label className="block text-sm font-medium text-gray-dark">รูปภาพสินค้า</label>
                          <input type="text" value={product.image || ""} onChange={(e) => handleEdit("products", product.id, "image", e.target.value)} className="w-full px-3 py-2 border border-gray-light rounded-lg outline-none mb-2" placeholder="URL รูปภาพ (หรืออัปโหลดด้านล่าง)" />
                          <div className="text-sm text-gray-medium text-center my-2">หรือ</div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload("products", product.id, e)} 
                            className="w-full text-sm text-gray-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                          />
                          {product.image && product.image.startsWith('data:image') && (
                            <p className="text-xs text-green-600 mt-1">อัปโหลดรูปภาพสำเร็จ (Base64)</p>
                          )}
                        </div>

                        <button onClick={() => setEditing(null)} className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg font-semibold"><Save className="w-4 h-4" /> บันทึก</button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold text-foreground mb-2">{product.name}</h3>
                        {product.image && (
                          <div className="mb-4 h-32 w-full bg-gray-100 rounded-lg overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <ul className="space-y-1 mb-2">
                          {product.specs.map((spec: string, i: number) => (<li key={i} className="text-sm text-gray-medium">• {spec}</li>))}
                        </ul>
                        <div className="font-bold text-primary mb-4">{product.price}</div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditing(`products-${product.id}`)} className="flex items-center gap-1 text-sm text-gray-medium hover:text-primary"><Edit2 className="w-4 h-4" /> แก้ไข</button>
                          <button onClick={() => handleDelete("products", product.id)} className="flex items-center gap-1 text-sm text-gray-medium hover:text-red-500"><Trash2 className="w-4 h-4" /> ลบ</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">จัดการผลงาน</h2>
                <button onClick={() => handleAdd("portfolio")} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  <Plus className="w-4 h-4" /> เพิ่มผลงาน
                </button>
              </div>
              <div className="space-y-4">
                {data.portfolio.map((project: any) => (
                  <div key={project.id} className="p-4 border border-gray-light rounded-lg">
                    {editing === `portfolio-${project.id}` ? (
                      <div className="space-y-4">
                        <input type="text" value={project.title} onChange={(e) => handleEdit("portfolio", project.id, "title", e.target.value)} className="w-full px-3 py-2 border border-gray-light rounded-lg outline-none" placeholder="ชื่อโครงการ" />
                        <input type="text" value={project.client} onChange={(e) => handleEdit("portfolio", project.id, "client", e.target.value)} className="w-full px-3 py-2 border border-gray-light rounded-lg outline-none" placeholder="ชื่อลูกค้า" />
                        
                        <div className="space-y-2 border border-gray-light p-3 rounded-lg">
                          <label className="block text-sm font-medium text-gray-dark">รูปภาพผลงาน</label>
                          <input type="text" value={project.image} onChange={(e) => handleEdit("portfolio", project.id, "image", e.target.value)} className="w-full px-3 py-2 border border-gray-light rounded-lg outline-none mb-2" placeholder="URL รูปภาพ (หรืออัปโหลดด้านล่าง)" />
                          <div className="text-sm text-gray-medium text-center my-2">หรือ</div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload("portfolio", project.id, e)} 
                            className="w-full text-sm text-gray-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                          />
                          {project.image && project.image.startsWith('data:image') && (
                            <p className="text-xs text-green-600 mt-1">อัปโหลดรูปภาพสำเร็จ (Base64)</p>
                          )}
                        </div>

                        <button onClick={() => setEditing(null)} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors"><Save className="w-4 h-4" /> บันทึก</button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold text-foreground mb-2">{project.title}</h3>
                        <p className="text-gray-medium mb-2">{project.client}</p>
                        {project.image && (
                          <div className="mb-4 h-40 w-full bg-gray-100 rounded-lg overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x300/0f3460/ffffff?text=${encodeURIComponent(project.title || "Project")}`; }} />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button onClick={() => setEditing(`portfolio-${project.id}`)} className="flex items-center gap-1 text-sm text-gray-medium hover:text-primary"><Edit2 className="w-4 h-4" /> แก้ไข</button>
                          <button onClick={() => handleDelete("portfolio", project.id)} className="flex items-center gap-1 text-sm text-gray-medium hover:text-red-500"><Trash2 className="w-4 h-4" /> ลบ</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "clients" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">จัดการลูกค้า</h2>
                <button onClick={() => handleAdd("clients")} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  <Plus className="w-4 h-4" /> เพิ่มลูกค้า
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.clients.map((client: string, index: number) => (
                  <div key={index} className="p-4 border border-gray-light rounded-lg">
                    {editing === `clients-${index}` ? (
                      <div className="space-y-4">
                        <input type="text" value={client} onChange={(e) => { const c = [...data.clients]; c[index] = e.target.value; setData((prev: any) => ({ ...prev, clients: c })); }} className="w-full px-3 py-2 border border-gray-light rounded-lg outline-none" />
                        <button onClick={() => setEditing(null)} className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg font-semibold"><Save className="w-4 h-4" /> บันทึก</button>
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium text-foreground mb-2">{client}</div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditing(`clients-${index}`)} className="flex items-center gap-1 text-sm text-gray-medium hover:text-primary"><Edit2 className="w-4 h-4" /> แก้ไข</button>
                          <button onClick={() => { const c = data.clients.filter((_: any, i: number) => i !== index); setData((prev: any) => ({ ...prev, clients: c })); }} className="flex items-center gap-1 text-sm text-gray-medium hover:text-red-500"><Trash2 className="w-4 h-4" /> ลบ</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
