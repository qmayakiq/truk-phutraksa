"use client";

import { useState, useEffect } from "react";
import { Edit2, Save, Plus, Trash2, Eye, Lock, LogOut, Star } from "lucide-react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authConfigured, setAuthConfigured] = useState(true);
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("settings");

  // ตรวจสอบ auth จาก server เพื่อไม่พึ่ง sessionStorage อย่างเดียว
  useEffect(() => {
    let mounted = true;

    fetch("/admin/api/auth", { cache: "no-store" })
      .then((res) => res.json())
      .then((result) => {
        if (!mounted) return;
        const isAuthed = Boolean(result?.authenticated);
        setAuthConfigured(result?.configured !== false);
        setAuthenticated(isAuthed);
        if (isAuthed) {
          sessionStorage.setItem("admin_auth", "true");
        } else {
          sessionStorage.removeItem("admin_auth");
        }
      })
      .catch(() => {
        if (!mounted) return;
        setAuthConfigured(true);
        setAuthenticated(false);
        sessionStorage.removeItem("admin_auth");
      })
      .finally(() => {
        if (mounted) setAuthLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // โหลดข้อมูลหลังจาก login
  useEffect(() => {
    if (!authenticated) return;
    fetch("/admin/api/save-data")
      .then((res) => res.json())
      .then((result) => {
        if (!result.stats) result.stats = [
          { id: 1, label: "รถที่จำหน่าย", value: "150+" },
          { id: 2, label: "ลูกค้าทั่วประเทศ", value: "20+" },
          { id: 3, label: "ประสบการณ์", value: "10+" },
        ];
        if (!result.settings) result.settings = { heroBackground: "" };
        if (!result.about) result.about = { companyHistory: "", vision: "", mission: "", certifications: [] };
        if (!result.testimonials) result.testimonials = [];
        if (!result.contactInfo) result.contactInfo = { phone: "082-880-0878", line: "@truk", email: "info@truk.co.th", address: "", mapUrl: "", businessHours: { weekday: "08:00 - 17:00", saturday: "08:00 - 12:00", sunday: "หยุดทำการ" }, facebook: "", youtube: "" };
        setData(result);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/admin/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();
      if (result.success) {
        sessionStorage.setItem("admin_auth", "true");
        setAuthenticated(true);
      } else if (result.code === "ADMIN_PASSWORD_NOT_CONFIGURED") {
        setAuthConfigured(false);
        setAuthError("ยังไม่ได้ตั้งค่า ADMIN_PASSWORD บนเซิร์ฟเวอร์");
      } else {
        setAuthError("รหัสผ่านไม่ถูกต้อง");
      }
    } catch {
      setAuthError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  const handleLogout = () => {
    fetch("/admin/api/auth", { method: "DELETE" }).finally(() => {
      sessionStorage.removeItem("admin_auth");
      setAuthenticated(false);
      setPassword("");
      setData(null);
    });
  };

  const handleEdit = (section: string, id: number, field: string, value: any) => {
    setData((prev: any) => {
      if (section === "settings" || section === "about" || section === "contactInfo") {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      }
      // For stats, products, portfolio, testimonials - use id to find the item
      if (section === "stats" || section === "products" || section === "portfolio" || section === "testimonials") {
        return { ...prev, [section]: prev[section].map((item: any) => item.id === id ? { ...item, [field]: value } : item) };
      }
      // For arrays using index (like socialLinks)
      return { ...prev, [section]: prev[section].map((item: any, index: number) => index === id ? { ...item, [field]: value } : item) };
    });
  };

  const handleNestedEdit = (section: string, nested: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [nested]: { ...prev[section][nested], [field]: value } },
    }));
  };

  const handleSettingImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert("กรุณาอัปโหลดรูปไม่เกิน 2MB"); return; }
      const reader = new FileReader();
      reader.onloadend = () => { handleEdit("settings", 0, "heroBackground", reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (section: string, id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { alert("กรุณาอัปโหลดรูปไม่เกิน 1MB"); return; }
      const reader = new FileReader();
      reader.onloadend = () => { handleEdit(section, id, "image", reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (section: string) => {
    const id = Date.now();
    const items: any = {
      stats: { id, label: "ใหม่", value: "0+" },
      products: { id, name: "สินค้าใหม่", specs: ["สเปคใหม่"], price: "ติดต่อ", image: "" },
      portfolio: { id, title: "โครงการใหม่", client: "ลูกค้าใหม่", image: "" },
      clients: "ลูกค้าใหม่",
      testimonials: { id, name: "ชื่อลูกค้า", role: "ตำแหน่ง", org: "หน่วยงาน", content: "ความคิดเห็น", rating: 5 },
    };
    if (section === "clients") {
      setData((prev: any) => ({ ...prev, clients: [...(prev.clients || []), items.clients] }));
    } else {
      setData((prev: any) => ({ ...prev, [section]: [...(prev[section] || []), items[section]] }));
    }
  };

  const handleDelete = (section: string, id: number) => {
    setData((prev: any) => ({ ...prev, [section]: (prev[section] || []).filter((item: any) => item.id !== id) }));
  };

  const handleCertAdd = () => {
    setData((prev: any) => ({
      ...prev,
      about: { ...prev.about, certifications: [...(prev.about?.certifications || []), "มาตรฐานใหม่"] },
    }));
  };

  const handleCertEdit = (index: number, value: string) => {
    setData((prev: any) => {
      const certs = [...(prev.about?.certifications || [])];
      certs[index] = value;
      return { ...prev, about: { ...prev.about, certifications: certs } };
    });
  };

  const handleCertDelete = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      about: { ...prev.about, certifications: prev.about.certifications.filter((_: any, i: number) => i !== index) },
    }));
  };

  const handleSocialAdd = () => {
    setData((prev: any) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), { name: "", url: "", icon: "Facebook" }],
    }));
  };

  const handleSocialDelete = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_: any, i: number) => i !== index),
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
      if (response.status === 401) {
        sessionStorage.removeItem("admin_auth");
        setAuthenticated(false);
        alert("เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่");
        return;
      }
      const result = await response.json();
      if (result.success) alert("บันทึกข้อมูลเรียบร้อย!");
      else alert("บันทึกข้อมูลไม่สำเร็จ");
    } catch { alert("บันทึกข้อมูลไม่สำเร็จ"); }
    finally { setSaving(false); }
  };

  // --- Login Screen ---
  if (authLoading) {
    return <div className="min-h-screen bg-gray-bg flex items-center justify-center"><div className="text-lg text-gray-medium">กำลังโหลด...</div></div>;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
            <p className="text-gray-medium text-sm mt-1">กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบ</p>
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
              placeholder="รหัสผ่าน"
              required
              autoFocus
              disabled={!authConfigured}
            />
          </div>
          {!authConfigured && (
            <p className="text-amber-600 text-sm mb-4 text-center">
              ผู้ดูแลระบบต้องตั้งค่า `ADMIN_PASSWORD` ก่อนใช้งานหน้านี้
            </p>
          )}
          {authError && <p className="text-red-500 text-sm mb-4 text-center">{authError}</p>}
          <button type="submit" disabled={!authConfigured} className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-bg flex items-center justify-center"><div className="text-lg text-gray-medium">กำลังโหลดข้อมูล...</div></div>;
  }

  // Helper: input class
  const inputCls = "w-full px-3 py-2 border border-gray-light rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary/20";
  const textareaCls = `${inputCls} min-h-[100px] resize-y`;
  const btnEdit = "flex items-center gap-1 text-sm text-gray-medium hover:text-primary";
  const btnDel = "flex items-center gap-1 text-sm text-gray-medium hover:text-red-500";
  const btnSave = "flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors";

  const tabs = [
    { key: "settings", label: "ตั้งค่าทั่วไป" },
    { key: "about", label: "เกี่ยวกับเรา" },
    { key: "stats", label: "สถิติ" },
    { key: "products", label: "สินค้า" },
    { key: "portfolio", label: "ผลงาน" },
    { key: "clients", label: "ลูกค้า" },
    { key: "testimonials", label: "รีวิว" },
    { key: "contact", label: "ข้อมูลติดต่อ" },
    { key: "social", label: "โซเชียลมีเดีย" },
  ];

  return (
    <div className="min-h-screen bg-gray-bg p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
              <p className="text-gray-medium">จัดการข้อมูลเว็บไซต์ TRUK Phutraksa</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-medium hover:text-red-500 text-sm transition-colors">
              <LogOut className="w-4 h-4" /> ออกจากระบบ
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </button>
            <a href="/" target="_blank" className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-dark px-6 py-2 rounded-lg font-semibold transition-colors">
              <Eye className="w-4 h-4" /> ดูเว็บไซต์
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.key ? "bg-primary text-white" : "bg-gray-bg text-gray-dark hover:bg-gray-100"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          {/* ===== ตั้งค่าทั่วไป ===== */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">ตั้งค่าทั่วไป</h2>
              <div className="p-4 border border-gray-light rounded-lg">
                <h3 className="font-bold text-foreground mb-4">รูปภาพพื้นหลัง Hero Section</h3>
                {data.settings?.heroBackground ? (
                  <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-light mb-4">
                    <img src={data.settings.heroBackground} alt="Hero" className="w-full h-full object-cover" />
                    <button onClick={() => handleEdit("settings", 0, "heroBackground", "")} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <div className="h-48 w-full rounded-lg bg-[#0f3460] flex items-center justify-center border border-gray-light mb-4 opacity-50">
                    <span className="text-white">ใช้พื้นหลังสีน้ำเงินเริ่มต้น</span>
                  </div>
                )}
                <div className="space-y-2 border border-gray-light p-3 rounded-lg bg-gray-50">
                  <input type="text" value={data.settings?.heroBackground || ""} onChange={(e) => handleEdit("settings", 0, "heroBackground", e.target.value)} className={inputCls} placeholder="URL รูปภาพ" />
                  <div className="text-sm text-gray-medium text-center">หรือ</div>
                  <input type="file" accept="image/*" onChange={handleSettingImageUpload} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
                  <p className="text-xs text-gray-medium mt-2">แนะนำ: ภาพแนวนอน 1920x1080</p>
                </div>
              </div>
            </div>
          )}

          {/* ===== เกี่ยวกับเรา ===== */}
          {activeTab === "about" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">จัดการข้อมูลเกี่ยวกับเรา</h2>
              <div className="space-y-6">
                <div className="p-4 border border-gray-light rounded-lg">
                  <label className="block text-sm font-bold text-foreground mb-2">ประวัติบริษัท</label>
                  <textarea value={data.about?.companyHistory || ""} onChange={(e) => handleEdit("about", 0, "companyHistory", e.target.value)} className={textareaCls} placeholder="เรื่องราวของบริษัท..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-light rounded-lg">
                    <label className="block text-sm font-bold text-foreground mb-2">วิสัยทัศน์</label>
                    <textarea value={data.about?.vision || ""} onChange={(e) => handleEdit("about", 0, "vision", e.target.value)} className={textareaCls} placeholder="วิสัยทัศน์ของบริษัท..." />
                  </div>
                  <div className="p-4 border border-gray-light rounded-lg">
                    <label className="block text-sm font-bold text-foreground mb-2">พันธกิจ</label>
                    <textarea value={data.about?.mission || ""} onChange={(e) => handleEdit("about", 0, "mission", e.target.value)} className={textareaCls} placeholder="พันธกิจของบริษัท..." />
                  </div>
                </div>
                <div className="p-4 border border-gray-light rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-foreground">มาตรฐานและการรับรอง</label>
                    <button onClick={handleCertAdd} className={btnSave}><Plus className="w-4 h-4" /> เพิ่ม</button>
                  </div>
                  <div className="space-y-2">
                    {(data.about?.certifications || []).map((cert: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="text" value={cert} onChange={(e) => handleCertEdit(i, e.target.value)} className={`${inputCls} flex-1`} />
                        <button onClick={() => handleCertDelete(i)} className="p-2 text-gray-medium hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== สถิติ ===== */}
          {activeTab === "stats" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">จัดการสถิติ</h2>
                <button onClick={() => handleAdd("stats")} className={btnSave}><Plus className="w-4 h-4" /> เพิ่มสถิติ</button>
              </div>
              <div className="space-y-4">
                {data.stats?.map((stat: any) => (
                  <div key={stat.id} className="flex items-center gap-4 p-4 border border-gray-light rounded-lg">
                    {editing === `stats-${stat.id}` ? (
                      <div className="flex items-center gap-4 flex-1">
                        <input 
                          type="text" 
                          value={stat.label} 
                          onChange={(e) => handleEdit("stats", stat.id, "label", e.target.value)} 
                          className="w-full px-4 py-3 border-2 border-gray-light rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-base font-medium text-gray-900 bg-white"
                          autoFocus
                          placeholder="ชื่อสถิติ"
                        />
                        <input 
                          type="text" 
                          value={stat.value} 
                          onChange={(e) => handleEdit("stats", stat.id, "value", e.target.value)} 
                          className="w-32 px-4 py-3 border-2 border-gray-light rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-base font-medium text-gray-900 bg-white"
                          placeholder="ค่า"
                        />
                        <button onClick={() => setEditing(null)} className="p-2 text-gray-medium hover:text-primary"><Save className="w-5 h-5" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-1"><div className="font-semibold text-foreground">{stat.label}</div><div className="text-2xl font-bold text-primary">{stat.value}</div></div>
                        <button onClick={() => setEditing(`stats-${stat.id}`)} className="p-2 text-gray-medium hover:text-primary"><Edit2 className="w-5 h-5" /></button>
                        <button onClick={() => handleDelete("stats", stat.id)} className="p-2 text-gray-medium hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== สินค้า ===== */}
          {activeTab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">จัดการสินค้า</h2>
                <button onClick={() => handleAdd("products")} className={btnSave}><Plus className="w-4 h-4" /> เพิ่มสินค้า</button>
              </div>
              <div className="space-y-4">
                {data.products?.map((product: any) => (
                  <div key={product.id} className="p-4 border border-gray-light rounded-lg">
                    {editing === `products-${product.id}` ? (
                      <div className="space-y-4">
                        <input type="text" value={product.name} onChange={(e) => handleEdit("products", product.id, "name", e.target.value)} className={`${inputCls} font-bold`} />
                        <textarea value={product.specs?.join('\n') || ""} onChange={(e) => handleEdit("products", product.id, "specs", e.target.value.split('\n'))} className={textareaCls} placeholder="สเปค (บรรทัดละ 1 ข้อ)" />
                        <input type="text" value={product.price} onChange={(e) => handleEdit("products", product.id, "price", e.target.value)} className={inputCls} placeholder="ราคา" />
                        <div className="space-y-2 border border-gray-light p-3 rounded-lg">
                          <label className="block text-sm font-medium text-gray-dark">รูปภาพสินค้า</label>
                          <input type="text" value={product.image || ""} onChange={(e) => handleEdit("products", product.id, "image", e.target.value)} className={inputCls} placeholder="URL รูปภาพ" />
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload("products", product.id, e)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary cursor-pointer" />
                        </div>
                        <button onClick={() => setEditing(null)} className={btnSave}><Save className="w-4 h-4" /> เสร็จ</button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold text-foreground mb-2">{product.name}</h3>
                        {product.image && <div className="mb-3 h-32 w-full bg-gray-100 rounded-lg overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-full object-cover" /></div>}
                        <ul className="space-y-1 mb-2">{product.specs?.map((s: string, i: number) => <li key={i} className="text-sm text-gray-medium">• {s}</li>)}</ul>
                        <div className="font-bold text-primary mb-3">{product.price}</div>
                        <div className="flex gap-3">
                          <button onClick={() => setEditing(`products-${product.id}`)} className={btnEdit}><Edit2 className="w-4 h-4" /> แก้ไข</button>
                          <button onClick={() => handleDelete("products", product.id)} className={btnDel}><Trash2 className="w-4 h-4" /> ลบ</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== ผลงาน ===== */}
          {activeTab === "portfolio" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">จัดการผลงาน</h2>
                <button onClick={() => handleAdd("portfolio")} className={btnSave}><Plus className="w-4 h-4" /> เพิ่มผลงาน</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.portfolio?.map((project: any) => (
                  <div key={project.id} className="p-4 border border-gray-light rounded-lg">
                    {editing === `portfolio-${project.id}` ? (
                      <div className="space-y-4">
                        <input type="text" value={project.title} onChange={(e) => handleEdit("portfolio", project.id, "title", e.target.value)} className={inputCls} placeholder="ชื่อโครงการ" />
                        <input type="text" value={project.client} onChange={(e) => handleEdit("portfolio", project.id, "client", e.target.value)} className={inputCls} placeholder="ชื่อลูกค้า" />
                        <div className="space-y-2 border border-gray-light p-3 rounded-lg">
                          <input type="text" value={project.image || ""} onChange={(e) => handleEdit("portfolio", project.id, "image", e.target.value)} className={inputCls} placeholder="URL รูปภาพ" />
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload("portfolio", project.id, e)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary cursor-pointer" />
                        </div>
                        <button onClick={() => setEditing(null)} className={btnSave}><Save className="w-4 h-4" /> เสร็จ</button>
                      </div>
                    ) : (
                      <div>
                        {project.image && <div className="mb-3 h-36 w-full bg-gray-100 rounded-lg overflow-hidden"><img src={project.image} alt={project.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>}
                        <h3 className="font-bold text-foreground">{project.title}</h3>
                        <p className="text-gray-medium text-sm mb-3">{project.client}</p>
                        <div className="flex gap-3">
                          <button onClick={() => setEditing(`portfolio-${project.id}`)} className={btnEdit}><Edit2 className="w-4 h-4" /> แก้ไข</button>
                          <button onClick={() => handleDelete("portfolio", project.id)} className={btnDel}><Trash2 className="w-4 h-4" /> ลบ</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== ลูกค้า ===== */}
          {activeTab === "clients" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">จัดการลูกค้า</h2>
                <button onClick={() => handleAdd("clients")} className={btnSave}><Plus className="w-4 h-4" /> เพิ่มลูกค้า</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.clients?.map((client: string, index: number) => (
                  <div key={index} className="p-4 border border-gray-light rounded-lg">
                    {editing === `clients-${index}` ? (
                      <div className="space-y-3">
                        <input type="text" value={client} onChange={(e) => { const c = [...data.clients]; c[index] = e.target.value; setData((prev: any) => ({ ...prev, clients: c })); }} className={inputCls} />
                        <button onClick={() => setEditing(null)} className={btnSave}><Save className="w-4 h-4" /> เสร็จ</button>
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium text-foreground mb-2">{client}</div>
                        <div className="flex gap-3">
                          <button onClick={() => setEditing(`clients-${index}`)} className={btnEdit}><Edit2 className="w-4 h-4" /> แก้ไข</button>
                          <button onClick={() => { const c = data.clients.filter((_: any, i: number) => i !== index); setData((prev: any) => ({ ...prev, clients: c })); }} className={btnDel}><Trash2 className="w-4 h-4" /> ลบ</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== รีวิว ===== */}
          {activeTab === "testimonials" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">จัดการรีวิวลูกค้า</h2>
                <button onClick={() => handleAdd("testimonials")} className={btnSave}><Plus className="w-4 h-4" /> เพิ่มรีวิว</button>
              </div>
              <div className="space-y-4">
                {data.testimonials?.map((item: any) => (
                  <div key={item.id} className="p-4 border border-gray-light rounded-lg">
                    {editing === `testimonials-${item.id}` ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input type="text" value={item.name} onChange={(e) => handleEdit("testimonials", item.id, "name", e.target.value)} className={inputCls} placeholder="ชื่อลูกค้า" />
                          <input type="text" value={item.role} onChange={(e) => handleEdit("testimonials", item.id, "role", e.target.value)} className={inputCls} placeholder="ตำแหน่ง" />
                          <input type="text" value={item.org} onChange={(e) => handleEdit("testimonials", item.id, "org", e.target.value)} className={inputCls} placeholder="หน่วยงาน" />
                        </div>
                        <textarea value={item.content} onChange={(e) => handleEdit("testimonials", item.id, "content", e.target.value)} className={textareaCls} placeholder="ความคิดเห็น" />
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-dark">คะแนน:</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button key={star} onClick={() => handleEdit("testimonials", item.id, "rating", star)} className="p-0.5">
                                <Star className={`w-5 h-5 ${star <= (item.rating || 5) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <button onClick={() => setEditing(null)} className={btnSave}><Save className="w-4 h-4" /> เสร็จ</button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex gap-1 mb-2">{Array.from({ length: item.rating || 5 }).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
                        <p className="text-gray-medium text-sm mb-3">&ldquo;{item.content}&rdquo;</p>
                        <div className="font-semibold text-foreground text-sm">{item.name}</div>
                        <div className="text-xs text-gray-medium">{item.role} - {item.org}</div>
                        <div className="flex gap-3 mt-3">
                          <button onClick={() => setEditing(`testimonials-${item.id}`)} className={btnEdit}><Edit2 className="w-4 h-4" /> แก้ไข</button>
                          <button onClick={() => handleDelete("testimonials", item.id)} className={btnDel}><Trash2 className="w-4 h-4" /> ลบ</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== ข้อมูลติดต่อ ===== */}
          {activeTab === "contact" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">จัดการข้อมูลติดต่อ</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-light rounded-lg">
                    <label className="block text-sm font-bold text-foreground mb-2">เบอร์โทรศัพท์</label>
                    <input type="text" value={data.contactInfo?.phone || ""} onChange={(e) => handleEdit("contactInfo", 0, "phone", e.target.value)} className={inputCls} placeholder="082-880-0878" />
                  </div>
                  <div className="p-4 border border-gray-light rounded-lg">
                    <label className="block text-sm font-bold text-foreground mb-2">LINE ID</label>
                    <input type="text" value={data.contactInfo?.line || ""} onChange={(e) => handleEdit("contactInfo", 0, "line", e.target.value)} className={inputCls} placeholder="@truk" />
                  </div>
                  <div className="p-4 border border-gray-light rounded-lg">
                    <label className="block text-sm font-bold text-foreground mb-2">อีเมล</label>
                    <input type="text" value={data.contactInfo?.email || ""} onChange={(e) => handleEdit("contactInfo", 0, "email", e.target.value)} className={inputCls} placeholder="info@truk.co.th" />
                  </div>
                  <div className="p-4 border border-gray-light rounded-lg">
                    <label className="block text-sm font-bold text-foreground mb-2">Facebook</label>
                    <input type="text" value={data.contactInfo?.facebook || ""} onChange={(e) => handleEdit("contactInfo", 0, "facebook", e.target.value)} className={inputCls} placeholder="https://facebook.com/..." />
                  </div>
                </div>
                <div className="p-4 border border-gray-light rounded-lg">
                  <label className="block text-sm font-bold text-foreground mb-2">ที่อยู่</label>
                  <textarea value={data.contactInfo?.address || ""} onChange={(e) => handleEdit("contactInfo", 0, "address", e.target.value)} className={textareaCls} placeholder="ที่อยู่โรงงาน..." />
                </div>
                <div className="p-4 border border-gray-light rounded-lg">
                  <label className="block text-sm font-bold text-foreground mb-2">Google Maps Embed URL</label>
                  <input type="text" value={data.contactInfo?.mapUrl || ""} onChange={(e) => handleEdit("contactInfo", 0, "mapUrl", e.target.value)} className={inputCls} placeholder="https://www.google.com/maps/embed?pb=..." />
                  <p className="text-xs text-gray-medium mt-2">วิธีหา: เปิด Google Maps → กดแชร์ → ฝังแผนที่ → คัดลอก src URL</p>
                </div>
                <div className="p-4 border border-gray-light rounded-lg">
                  <label className="block text-sm font-bold text-foreground mb-4">เวลาทำการ</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-medium mb-1">จันทร์ - ศุกร์</label>
                      <input type="text" value={data.contactInfo?.businessHours?.weekday || ""} onChange={(e) => handleNestedEdit("contactInfo", "businessHours", "weekday", e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-medium mb-1">เสาร์</label>
                      <input type="text" value={data.contactInfo?.businessHours?.saturday || ""} onChange={(e) => handleNestedEdit("contactInfo", "businessHours", "saturday", e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-medium mb-1">อาทิตย์</label>
                      <input type="text" value={data.contactInfo?.businessHours?.sunday || ""} onChange={(e) => handleNestedEdit("contactInfo", "businessHours", "sunday", e.target.value)} className={inputCls} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== โซเชียลมีเดีย ===== */}
          {activeTab === "social" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">จัดการโซเชียลมีเดีย</h2>
              <div className="space-y-4">
                {(data.socialLinks || []).map((link: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-light rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-2">ชื่อ</label>
                        <input type="text" value={link.name} onChange={(e) => handleEdit("socialLinks", index, "name", e.target.value)} className={inputCls} placeholder="Facebook, LINE, YouTube..." />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-2">URL</label>
                        <input type="text" value={link.url} onChange={(e) => handleEdit("socialLinks", index, "url", e.target.value)} className={inputCls} placeholder="https://..." />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Icon</label>
                        <select value={link.icon} onChange={(e) => handleEdit("socialLinks", index, "icon", e.target.value)} className={inputCls}>
                          <option value="Facebook">Facebook</option>
                          <option value="MessageCircle">LINE</option>
                          <option value="Youtube">YouTube</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Twitter">Twitter</option>
                          <option value="Linkedin">LinkedIn</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button onClick={() => handleSocialDelete(index)} className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={handleSocialAdd} className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  + เพิ่มโซเชียลมีเดีย
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
