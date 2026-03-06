import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { getQueryFn } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  LayoutDashboard,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import type {
  HeroContent,
  Stat,
  Service,
  Project,
  TeamMember,
  Testimonial,
  BlogPost,
  ContactMessage,
  FooterContent,
  FooterLink,
  ContactInfo,
  SectionVisibility,
} from "@shared/schema";

const GRADIENT_OPTIONS = [
  { value: "from-blue-600 to-cyan-500", label: "Blue to Cyan" },
  { value: "from-emerald-500 to-teal-600", label: "Emerald to Teal" },
  { value: "from-orange-500 to-rose-500", label: "Orange to Rose" },
  { value: "from-violet-600 to-purple-500", label: "Violet to Purple" },
  { value: "from-pink-500 to-rose-600", label: "Pink to Rose" },
  { value: "from-green-500 to-emerald-600", label: "Green to Emerald" },
  { value: "from-blue-600 to-indigo-600", label: "Blue to Indigo" },
  { value: "from-rose-500 to-pink-600", label: "Rose to Pink" },
  { value: "from-blue-500 to-indigo-600", label: "Blue to Indigo Light" },
  { value: "from-emerald-500 to-green-600", label: "Emerald to Green" },
  { value: "from-violet-500 to-purple-600", label: "Violet to Purple Light" },
  { value: "from-orange-500 to-red-500", label: "Orange to Red" },
];

const ICON_OPTIONS = [
  "Globe", "Smartphone", "Palette", "TrendingUp", "Code2", "Cloud",
  "Layers", "Monitor", "Cpu", "Database", "Shield", "Zap",
  "Target", "BarChart", "Settings", "Search", "Users", "Mail",
];

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/login", { username, password });
    },
    onSuccess: () => {
      onLogin();
    },
    onError: () => {
      toast({ title: "Invalid credentials", description: "Please check your username and password.", variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-sm p-8 border-border/50">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-sm">FIO</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage your website</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); loginMutation.mutate(); }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="pl-9" placeholder="admin" data-testid="input-admin-username" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" placeholder="Enter password" data-testid="input-admin-password" />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loginMutation.isPending} data-testid="button-admin-login">
            {loginMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}

function HeroEditor() {
  const { data: hero, isLoading } = useQuery<HeroContent>({ queryKey: ["/api/hero"] });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<HeroContent>>({});
  const { toast } = useToast();

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<HeroContent>) => {
      await apiRequest("PUT", "/api/hero", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero"] });
      setEditing(false);
      toast({ title: "Hero updated" });
    },
  });

  if (isLoading || !hero) return <div className="p-4 text-muted-foreground">Loading...</div>;

  const startEdit = () => { setForm(hero); setEditing(true); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-lg font-semibold text-foreground">Hero Section</h3>
        <Button onClick={startEdit} data-testid="button-edit-hero"><Pencil className="w-4 h-4 mr-2" />Edit Hero</Button>
      </div>
      <Card className="p-6 border-border/50 space-y-3">
        <div><span className="text-sm text-muted-foreground">Badge: </span><span className="text-foreground">{hero.badgeText}</span></div>
        <div><span className="text-sm text-muted-foreground">Title: </span><span className="text-foreground">{hero.titleLine1} <em>{hero.titleHighlight}</em> {hero.titleLine3}</span></div>
        <div><span className="text-sm text-muted-foreground">Subtitle: </span><span className="text-foreground text-sm">{hero.subtitle}</span></div>
        <div><span className="text-sm text-muted-foreground">CTA Buttons: </span><span className="text-foreground">{hero.ctaPrimary} | {hero.ctaSecondary}</span></div>
      </Card>
      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Hero Section</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Badge Text</Label><Input value={form.badgeText || ""} onChange={(e) => setForm({ ...form, badgeText: e.target.value })} data-testid="input-hero-badge" /></div>
            <div className="space-y-2"><Label>Title Line 1</Label><Input value={form.titleLine1 || ""} onChange={(e) => setForm({ ...form, titleLine1: e.target.value })} data-testid="input-hero-title1" /></div>
            <div className="space-y-2"><Label>Title Highlight (gradient text)</Label><Input value={form.titleHighlight || ""} onChange={(e) => setForm({ ...form, titleHighlight: e.target.value })} data-testid="input-hero-highlight" /></div>
            <div className="space-y-2"><Label>Title Line 3</Label><Input value={form.titleLine3 || ""} onChange={(e) => setForm({ ...form, titleLine3: e.target.value })} data-testid="input-hero-title3" /></div>
            <div className="space-y-2"><Label>Subtitle</Label><Textarea value={form.subtitle || ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="min-h-[80px] resize-none" data-testid="input-hero-subtitle" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Primary CTA</Label><Input value={form.ctaPrimary || ""} onChange={(e) => setForm({ ...form, ctaPrimary: e.target.value })} data-testid="input-hero-cta1" /></div>
              <div className="space-y-2"><Label>Secondary CTA</Label><Input value={form.ctaSecondary || ""} onChange={(e) => setForm({ ...form, ctaSecondary: e.target.value })} data-testid="input-hero-cta2" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            <Button onClick={() => updateMutation.mutate(form)} disabled={updateMutation.isPending} data-testid="button-save-hero">
              {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatsEditor() {
  const { data: stats = [], isLoading } = useQuery<Stat[]>({ queryKey: ["/api/stats"] });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Stat | null>(null);
  const [form, setForm] = useState({ value: "", label: "", sortOrder: 0 });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: async () => { await apiRequest("POST", "/api/stats", form); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/stats"] }); setDialogOpen(false); toast({ title: "Stat created" }); },
  });

  const updateMutation = useMutation({
    mutationFn: async () => { if (editItem) await apiRequest("PATCH", `/api/stats/${editItem.id}`, form); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/stats"] }); setDialogOpen(false); setEditItem(null); toast({ title: "Stat updated" }); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/stats/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/stats"] }); setDeleteId(null); toast({ title: "Stat deleted" }); },
  });

  const openCreate = () => { setEditItem(null); setForm({ value: "", label: "", sortOrder: stats.length }); setDialogOpen(true); };
  const openEdit = (item: Stat) => { setEditItem(item); setForm({ value: item.value, label: item.label, sortOrder: item.sortOrder }); setDialogOpen(true); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-lg font-semibold text-foreground">Hero Stats</h3>
        <Button onClick={openCreate} data-testid="button-add-stat"><Plus className="w-4 h-4 mr-2" />Add Stat</Button>
      </div>
      {isLoading ? <div className="text-muted-foreground">Loading...</div> : (
        <div className="grid sm:grid-cols-2 gap-3">
          {stats.map((stat) => (
            <Card key={stat.id} className="p-4 border-border/50 flex items-center justify-between gap-3">
              <div><div className="font-bold text-foreground">{stat.value}</div><div className="text-sm text-muted-foreground">{stat.label}</div></div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => openEdit(stat)} data-testid={`button-edit-stat-${stat.id}`}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => setDeleteId(stat.id)} data-testid={`button-delete-stat-${stat.id}`}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editItem ? "Edit Stat" : "Add Stat"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Value</Label><Input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="150+" data-testid="input-stat-value" /></div>
            <div className="space-y-2"><Label>Label</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Projects Delivered" data-testid="input-stat-label" /></div>
            <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} data-testid="input-stat-sort" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => editItem ? updateMutation.mutate() : createMutation.mutate()} disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-stat">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DeleteConfirm open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} isPending={deleteMutation.isPending} />
    </div>
  );
}

interface CrudEditorProps<T extends { id: string }> {
  title: string;
  apiPath: string;
  queryKey: string;
  fields: FieldDef[];
  renderItem: (item: T) => { primary: string; secondary: string };
  getDefaults: (count: number) => Record<string, any>;
  getFormValues: (item: T) => Record<string, any>;
}

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "tags" | "number";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

function CrudEditor<T extends { id: string }>({
  title,
  apiPath,
  queryKey: qk,
  fields,
  renderItem,
  getDefaults,
  getFormValues,
}: CrudEditorProps<T>) {
  const { data: items = [], isLoading } = useQuery<T[]>({ queryKey: [qk] });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form };
      fields.forEach((f) => {
        if (f.type === "tags" && typeof payload[f.name] === "string") {
          payload[f.name] = (payload[f.name] as string).split(",").map((s: string) => s.trim()).filter(Boolean);
        }
        if (f.type === "number") payload[f.name] = parseInt(payload[f.name]) || 0;
      });
      await apiRequest("POST", apiPath, payload);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [qk] }); setDialogOpen(false); toast({ title: `${title} created` }); },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!editItem) return;
      const payload = { ...form };
      fields.forEach((f) => {
        if (f.type === "tags" && typeof payload[f.name] === "string") {
          payload[f.name] = (payload[f.name] as string).split(",").map((s: string) => s.trim()).filter(Boolean);
        }
        if (f.type === "number") payload[f.name] = parseInt(payload[f.name]) || 0;
      });
      await apiRequest("PATCH", `${apiPath}/${editItem.id}`, payload);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [qk] }); setDialogOpen(false); setEditItem(null); toast({ title: `${title} updated` }); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `${apiPath}/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [qk] }); setDeleteId(null); toast({ title: `${title} deleted` }); },
  });

  const openCreate = () => {
    setEditItem(null);
    setForm(getDefaults(items.length));
    setDialogOpen(true);
  };

  const openEdit = (item: T) => {
    setEditItem(item);
    const vals = getFormValues(item);
    fields.forEach((f) => {
      if (f.type === "tags" && Array.isArray(vals[f.name])) {
        vals[f.name] = (vals[f.name] as string[]).join(", ");
      }
    });
    setForm(vals);
    setDialogOpen(true);
  };

  const setField = (name: string, value: any) => setForm((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-lg font-semibold text-foreground">{title}s</h3>
        <Button onClick={openCreate} data-testid={`button-add-${title.toLowerCase()}`}><Plus className="w-4 h-4 mr-2" />Add {title}</Button>
      </div>
      {isLoading ? <div className="text-muted-foreground">Loading...</div> : (
        <div className="space-y-2">
          {items.map((item) => {
            const display = renderItem(item);
            return (
              <Card key={item.id} className="p-4 border-border/50 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground truncate">{display.primary}</div>
                  <div className="text-sm text-muted-foreground truncate">{display.secondary}</div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(item)} data-testid={`button-edit-${item.id}`}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => setDeleteId(item.id)} data-testid={`button-delete-${item.id}`}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            );
          })}
          {items.length === 0 && <div className="text-center py-8 text-muted-foreground">No {title.toLowerCase()}s yet. Click the button above to add one.</div>}
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? `Edit ${title}` : `Add ${title}`}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea value={form[field.name] || ""} onChange={(e) => setField(field.name, e.target.value)} placeholder={field.placeholder} className="min-h-[80px] resize-none" data-testid={`input-${field.name}`} />
                ) : field.type === "select" ? (
                  <Select value={form[field.name] || ""} onValueChange={(v) => setField(field.name, v)}>
                    <SelectTrigger data-testid={`select-${field.name}`}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {field.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "tags" ? (
                  <Input value={form[field.name] || ""} onChange={(e) => setField(field.name, e.target.value)} placeholder={field.placeholder || "Tag1, Tag2, Tag3"} data-testid={`input-${field.name}`} />
                ) : field.type === "number" ? (
                  <Input type="number" value={form[field.name] ?? 0} onChange={(e) => setField(field.name, e.target.value)} data-testid={`input-${field.name}`} />
                ) : (
                  <Input value={form[field.name] || ""} onChange={(e) => setField(field.name, e.target.value)} placeholder={field.placeholder} data-testid={`input-${field.name}`} />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => editItem ? updateMutation.mutate() : createMutation.mutate()} disabled={createMutation.isPending || updateMutation.isPending} data-testid={`button-save-${title.toLowerCase()}`}>
              {(createMutation.isPending || updateMutation.isPending) ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DeleteConfirm open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} isPending={deleteMutation.isPending} />
    </div>
  );
}

function DeleteConfirm({ open, onCancel, onConfirm, isPending }: { open: boolean; onCancel: () => void; onConfirm: () => void; isPending: boolean }) {
  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isPending} data-testid="button-confirm-delete">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function MessagesViewer() {
  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({ queryKey: ["/api/messages"], queryFn: getQueryFn({ on401: "throw" }) });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/messages/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/messages"] }); setDeleteId(null); toast({ title: "Message deleted" }); },
  });

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Contact Messages ({messages.length})</h3>
      {messages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <Card key={msg.id} className="p-5 border-border/50">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-foreground">{msg.name}</span>
                    <span className="text-sm text-muted-foreground">{msg.email}</span>
                    {msg.company && <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{msg.company}</span>}
                    {msg.service && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{msg.service}</span>}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{msg.message}</p>
                  {msg.createdAt && <p className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleString()}</p>}
                </div>
                <Button size="icon" variant="ghost" onClick={() => setDeleteId(msg.id)} data-testid={`button-delete-msg-${msg.id}`}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <DeleteConfirm open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} isPending={deleteMutation.isPending} />
    </div>
  );
}

function SectionVisibilityEditor() {
  const { data: sections, isLoading } = useQuery<SectionVisibility[]>({ queryKey: ["/api/section-visibility"] });
  const { toast } = useToast();

  const toggleMutation = useMutation({
    mutationFn: async ({ sectionKey, visible }: { sectionKey: string; visible: boolean }) => {
      await apiRequest("PUT", `/api/section-visibility/${sectionKey}`, { visible });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/section-visibility"] });
      toast({ title: "Section visibility updated" });
    },
  });

  if (isLoading || !sections) return <div className="p-4 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-lg font-semibold text-foreground">Section Visibility</h3>
        <p className="text-sm text-muted-foreground">Toggle sections on or off to show/hide them on the website.</p>
      </div>
      <div className="grid gap-3">
        {sections.map((section) => (
          <Card key={section.id} className="p-4 border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {section.visible ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              <span className={`font-medium ${section.visible ? "text-foreground" : "text-muted-foreground"}`}>{section.label}</span>
            </div>
            <Switch
              checked={section.visible}
              onCheckedChange={(checked) => toggleMutation.mutate({ sectionKey: section.sectionKey, visible: checked })}
              disabled={toggleMutation.isPending}
              data-testid={`switch-visibility-${section.sectionKey}`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

function ContactInfoEditor() {
  const { data: info, isLoading } = useQuery<ContactInfo>({ queryKey: ["/api/contact-info"] });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<ContactInfo>>({});
  const { toast } = useToast();

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<ContactInfo>) => {
      await apiRequest("PUT", "/api/contact-info", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-info"] });
      setEditing(false);
      toast({ title: "Contact info updated" });
    },
  });

  if (isLoading || !info) return <div className="p-4 text-muted-foreground">Loading...</div>;

  const startEdit = () => { setForm(info); setEditing(true); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-lg font-semibold text-foreground">Contact Section</h3>
        <Button onClick={startEdit} data-testid="button-edit-contact-info"><Pencil className="w-4 h-4 mr-2" />Edit Contact Info</Button>
      </div>
      <Card className="p-6 border-border/50 space-y-3">
        <div><span className="text-sm text-muted-foreground">Label: </span><span className="text-foreground">{info.sectionLabel}</span></div>
        <div><span className="text-sm text-muted-foreground">Title: </span><span className="text-foreground">{info.sectionTitle}</span></div>
        <div><span className="text-sm text-muted-foreground">Subtitle: </span><span className="text-foreground text-sm">{info.sectionSubtitle}</span></div>
        <div className="border-t border-border pt-3 mt-3 space-y-2">
          <div><span className="text-sm text-muted-foreground">Email: </span><span className="text-foreground">{info.email}</span></div>
          <div><span className="text-sm text-muted-foreground">Phone: </span><span className="text-foreground">{info.phone}</span></div>
          <div><span className="text-sm text-muted-foreground">Address: </span><span className="text-foreground">{info.address}</span></div>
        </div>
        <div className="border-t border-border pt-3 mt-3 space-y-2">
          <div><span className="text-sm text-muted-foreground">CTA Title: </span><span className="text-foreground">{info.ctaTitle}</span></div>
          <div><span className="text-sm text-muted-foreground">CTA Button: </span><span className="text-foreground">{info.ctaButtonText}</span></div>
          <div><span className="text-sm text-muted-foreground">CTA URL: </span><span className="text-foreground text-xs">{info.ctaButtonUrl}</span></div>
        </div>
      </Card>
      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Contact Section</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Section Label</Label><Input value={form.sectionLabel || ""} onChange={(e) => setForm({ ...form, sectionLabel: e.target.value })} data-testid="input-contact-label" /></div>
            <div className="space-y-2"><Label>Section Title</Label><Input value={form.sectionTitle || ""} onChange={(e) => setForm({ ...form, sectionTitle: e.target.value })} data-testid="input-contact-title" /></div>
            <div className="space-y-2"><Label>Section Subtitle</Label><Textarea value={form.sectionSubtitle || ""} onChange={(e) => setForm({ ...form, sectionSubtitle: e.target.value })} className="min-h-[60px] resize-none" data-testid="input-contact-subtitle" /></div>
            <div className="space-y-2"><Label>Email Address</Label><Input value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="input-contact-email" /></div>
            <div className="space-y-2"><Label>Phone Number</Label><Input value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} data-testid="input-contact-phone" /></div>
            <div className="space-y-2"><Label>Address</Label><Input value={form.address || ""} onChange={(e) => setForm({ ...form, address: e.target.value })} data-testid="input-contact-address" /></div>
            <div className="space-y-2"><Label>CTA Title</Label><Input value={form.ctaTitle || ""} onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })} data-testid="input-contact-cta-title" /></div>
            <div className="space-y-2"><Label>CTA Description</Label><Textarea value={form.ctaDescription || ""} onChange={(e) => setForm({ ...form, ctaDescription: e.target.value })} className="min-h-[60px] resize-none" data-testid="input-contact-cta-desc" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>CTA Button Text</Label><Input value={form.ctaButtonText || ""} onChange={(e) => setForm({ ...form, ctaButtonText: e.target.value })} data-testid="input-contact-cta-btn" /></div>
              <div className="space-y-2"><Label>CTA Button URL</Label><Input value={form.ctaButtonUrl || ""} onChange={(e) => setForm({ ...form, ctaButtonUrl: e.target.value })} data-testid="input-contact-cta-url" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            <Button onClick={() => updateMutation.mutate(form)} disabled={updateMutation.isPending} data-testid="button-save-contact-info">
              {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FooterEditor() {
  const { data: footerData, isLoading: loadingContent } = useQuery<{ content: FooterContent; links: FooterLink[] }>({ queryKey: ["/api/footer"] });
  const { data: footerLinksData = [], isLoading: loadingLinks } = useQuery<FooterLink[]>({ queryKey: ["/api/footer-links"] });
  const [editingContent, setEditingContent] = useState(false);
  const [contentForm, setContentForm] = useState<Partial<FooterContent>>({});
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [editLink, setEditLink] = useState<FooterLink | null>(null);
  const [linkForm, setLinkForm] = useState({ section: "services", label: "", href: "#", sortOrder: 0 });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const content = footerData?.content;

  const updateContentMutation = useMutation({
    mutationFn: async (data: Partial<FooterContent>) => {
      await apiRequest("PUT", "/api/footer", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/footer"] });
      setEditingContent(false);
      toast({ title: "Footer content updated" });
    },
  });

  const createLinkMutation = useMutation({
    mutationFn: async () => { await apiRequest("POST", "/api/footer-links", linkForm); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/footer-links"] }); queryClient.invalidateQueries({ queryKey: ["/api/footer"] }); setLinkDialogOpen(false); toast({ title: "Footer link created" }); },
  });

  const updateLinkMutation = useMutation({
    mutationFn: async () => { if (editLink) await apiRequest("PATCH", `/api/footer-links/${editLink.id}`, linkForm); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/footer-links"] }); queryClient.invalidateQueries({ queryKey: ["/api/footer"] }); setLinkDialogOpen(false); setEditLink(null); toast({ title: "Footer link updated" }); },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/footer-links/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/footer-links"] }); queryClient.invalidateQueries({ queryKey: ["/api/footer"] }); setDeleteId(null); toast({ title: "Footer link deleted" }); },
  });

  const startEditContent = () => { if (content) { setContentForm(content); setEditingContent(true); } };
  const openCreateLink = () => { setEditLink(null); setLinkForm({ section: "services", label: "", href: "#", sortOrder: footerLinksData.length }); setLinkDialogOpen(true); };
  const openEditLink = (link: FooterLink) => { setEditLink(link); setLinkForm({ section: link.section, label: link.label, href: link.href, sortOrder: link.sortOrder }); setLinkDialogOpen(true); };

  if (loadingContent || loadingLinks) return <div className="text-muted-foreground p-4">Loading...</div>;

  const sectionOptions = [
    { value: "services", label: "Services" },
    { value: "company", label: "Company" },
    { value: "support", label: "Support" },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h3 className="text-lg font-semibold text-foreground">Footer Content</h3>
          <Button onClick={startEditContent} data-testid="button-edit-footer"><Pencil className="w-4 h-4 mr-2" />Edit Footer</Button>
        </div>
        {content && (
          <Card className="p-6 border-border/50 space-y-3">
            <div><span className="text-sm text-muted-foreground">Tagline: </span><span className="text-foreground text-sm">{content.tagline}</span></div>
            <div><span className="text-sm text-muted-foreground">Copyright: </span><span className="text-foreground">{content.copyrightText}</span></div>
            <div><span className="text-sm text-muted-foreground">Location: </span><span className="text-foreground">{content.locationText}</span></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              <div><span className="text-xs text-muted-foreground">Twitter: </span><span className="text-foreground text-xs truncate">{content.twitterUrl}</span></div>
              <div><span className="text-xs text-muted-foreground">LinkedIn: </span><span className="text-foreground text-xs truncate">{content.linkedinUrl}</span></div>
              <div><span className="text-xs text-muted-foreground">Instagram: </span><span className="text-foreground text-xs truncate">{content.instagramUrl}</span></div>
              <div><span className="text-xs text-muted-foreground">GitHub: </span><span className="text-foreground text-xs truncate">{content.githubUrl}</span></div>
              <div><span className="text-xs text-muted-foreground">Dribbble: </span><span className="text-foreground text-xs truncate">{content.dribbbleUrl}</span></div>
            </div>
          </Card>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h3 className="text-lg font-semibold text-foreground">Footer Links</h3>
          <Button onClick={openCreateLink} data-testid="button-add-footer-link"><Plus className="w-4 h-4 mr-2" />Add Link</Button>
        </div>
        {["services", "company", "support"].map((section) => {
          const sectionLinks = footerLinksData.filter((l) => l.section === section);
          if (sectionLinks.length === 0) return null;
          return (
            <div key={section}>
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">{section}</h4>
              <div className="space-y-2">
                {sectionLinks.map((link) => (
                  <Card key={link.id} className="p-3 border-border/50 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-foreground text-sm">{link.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">{link.href}</span>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button size="icon" variant="ghost" onClick={() => openEditLink(link)} data-testid={`button-edit-link-${link.id}`}><Pencil className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleteId(link.id)} data-testid={`button-delete-link-${link.id}`}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={editingContent} onOpenChange={setEditingContent}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Footer Content</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Tagline</Label><Textarea value={contentForm.tagline || ""} onChange={(e) => setContentForm({ ...contentForm, tagline: e.target.value })} className="min-h-[60px] resize-none" data-testid="input-footer-tagline" /></div>
            <div className="space-y-2"><Label>Copyright Text</Label><Input value={contentForm.copyrightText || ""} onChange={(e) => setContentForm({ ...contentForm, copyrightText: e.target.value })} data-testid="input-footer-copyright" /></div>
            <div className="space-y-2"><Label>Location Text</Label><Input value={contentForm.locationText || ""} onChange={(e) => setContentForm({ ...contentForm, locationText: e.target.value })} data-testid="input-footer-location" /></div>
            <div className="space-y-2"><Label>Twitter URL</Label><Input value={contentForm.twitterUrl || ""} onChange={(e) => setContentForm({ ...contentForm, twitterUrl: e.target.value })} placeholder="https://twitter.com/..." data-testid="input-footer-twitter" /></div>
            <div className="space-y-2"><Label>LinkedIn URL</Label><Input value={contentForm.linkedinUrl || ""} onChange={(e) => setContentForm({ ...contentForm, linkedinUrl: e.target.value })} placeholder="https://linkedin.com/..." data-testid="input-footer-linkedin" /></div>
            <div className="space-y-2"><Label>Instagram URL</Label><Input value={contentForm.instagramUrl || ""} onChange={(e) => setContentForm({ ...contentForm, instagramUrl: e.target.value })} placeholder="https://instagram.com/..." data-testid="input-footer-instagram" /></div>
            <div className="space-y-2"><Label>GitHub URL</Label><Input value={contentForm.githubUrl || ""} onChange={(e) => setContentForm({ ...contentForm, githubUrl: e.target.value })} placeholder="https://github.com/..." data-testid="input-footer-github" /></div>
            <div className="space-y-2"><Label>Dribbble URL</Label><Input value={contentForm.dribbbleUrl || ""} onChange={(e) => setContentForm({ ...contentForm, dribbbleUrl: e.target.value })} placeholder="https://dribbble.com/..." data-testid="input-footer-dribbble" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingContent(false)}>Cancel</Button>
            <Button onClick={() => updateContentMutation.mutate(contentForm)} disabled={updateContentMutation.isPending} data-testid="button-save-footer">
              {updateContentMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editLink ? "Edit Footer Link" : "Add Footer Link"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Section</Label>
              <Select value={linkForm.section} onValueChange={(v) => setLinkForm({ ...linkForm, section: v })}>
                <SelectTrigger data-testid="select-link-section"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {sectionOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Label</Label><Input value={linkForm.label} onChange={(e) => setLinkForm({ ...linkForm, label: e.target.value })} placeholder="Link text" data-testid="input-link-label" /></div>
            <div className="space-y-2"><Label>Href</Label><Input value={linkForm.href} onChange={(e) => setLinkForm({ ...linkForm, href: e.target.value })} placeholder="#services or https://..." data-testid="input-link-href" /></div>
            <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={linkForm.sortOrder} onChange={(e) => setLinkForm({ ...linkForm, sortOrder: parseInt(e.target.value) || 0 })} data-testid="input-link-sort" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => editLink ? updateLinkMutation.mutate() : createLinkMutation.mutate()} disabled={createLinkMutation.isPending || updateLinkMutation.isPending} data-testid="button-save-footer-link">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirm open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={() => deleteId && deleteLinkMutation.mutate(deleteId)} isPending={deleteLinkMutation.isPending} />
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { toast } = useToast();

  const logoutMutation = useMutation({
    mutationFn: async () => { await apiRequest("POST", "/api/admin/logout"); },
    onSuccess: () => { onLogout(); toast({ title: "Logged out" }); },
  });

  const serviceFields: FieldDef[] = [
    { name: "icon", label: "Icon", type: "select", options: ICON_OPTIONS.map((i) => ({ value: i, label: i })) },
    { name: "title", label: "Title", type: "text", placeholder: "Web Development" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Describe this service..." },
    { name: "features", label: "Features (comma-separated)", type: "tags", placeholder: "Feature 1, Feature 2, Feature 3" },
    { name: "sortOrder", label: "Sort Order", type: "number" },
  ];

  const projectFields: FieldDef[] = [
    { name: "title", label: "Title", type: "text", placeholder: "Project Name" },
    { name: "category", label: "Category", type: "select", options: [{ value: "web", label: "Web App" }, { value: "mobile", label: "Mobile App" }, { value: "design", label: "Design" }] },
    { name: "description", label: "Description", type: "textarea", placeholder: "Describe this project..." },
    { name: "tags", label: "Tags (comma-separated)", type: "tags", placeholder: "React, Node.js, PostgreSQL" },
    { name: "gradient", label: "Color Theme", type: "select", options: GRADIENT_OPTIONS },
    { name: "sortOrder", label: "Sort Order", type: "number" },
  ];

  const teamFields: FieldDef[] = [
    { name: "name", label: "Name", type: "text", placeholder: "John Doe" },
    { name: "role", label: "Role", type: "text", placeholder: "Lead Developer" },
    { name: "initials", label: "Initials", type: "text", placeholder: "JD" },
    { name: "color", label: "Avatar Color", type: "select", options: GRADIENT_OPTIONS },
    { name: "sortOrder", label: "Sort Order", type: "number" },
  ];

  const testimonialFields: FieldDef[] = [
    { name: "quote", label: "Quote", type: "textarea", placeholder: "What the client said..." },
    { name: "name", label: "Client Name", type: "text", placeholder: "Jane Smith" },
    { name: "role", label: "Role", type: "text", placeholder: "CEO" },
    { name: "company", label: "Company", type: "text", placeholder: "Acme Corp" },
    { name: "initials", label: "Initials", type: "text", placeholder: "JS" },
    { name: "color", label: "Avatar Color", type: "select", options: GRADIENT_OPTIONS },
    { name: "sortOrder", label: "Sort Order", type: "number" },
  ];

  const blogFields: FieldDef[] = [
    { name: "title", label: "Title", type: "text", placeholder: "Blog Post Title" },
    { name: "excerpt", label: "Excerpt", type: "textarea", placeholder: "Brief summary of the post..." },
    { name: "category", label: "Category", type: "text", placeholder: "Engineering" },
    { name: "readTime", label: "Read Time", type: "text", placeholder: "5 min read" },
    { name: "date", label: "Date", type: "text", placeholder: "Feb 20, 2026" },
    { name: "gradient", label: "Color Theme", type: "select", options: GRADIENT_OPTIONS },
    { name: "sortOrder", label: "Sort Order", type: "number" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2" data-testid="link-back-home">
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </a>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
            </div>
          </div>
          <Button variant="ghost" onClick={() => logoutMutation.mutate()} data-testid="button-admin-logout">
            <LogOut className="w-4 h-4 mr-2" />Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="hero" className="space-y-8">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="hero" data-testid="tab-hero">Hero</TabsTrigger>
            <TabsTrigger value="services" data-testid="tab-services">Services</TabsTrigger>
            <TabsTrigger value="portfolio" data-testid="tab-portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="team" data-testid="tab-team">Team</TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="blog" data-testid="tab-blog">Blog</TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">Contact</TabsTrigger>
            <TabsTrigger value="footer" data-testid="tab-footer">Footer</TabsTrigger>
            <TabsTrigger value="sections" data-testid="tab-sections">
              <Eye className="w-4 h-4 mr-1" />Sections
            </TabsTrigger>
            <TabsTrigger value="messages" data-testid="tab-messages">
              <Mail className="w-4 h-4 mr-1" />Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-8">
            <HeroEditor />
            <StatsEditor />
          </TabsContent>

          <TabsContent value="services">
            <CrudEditor
              title="Service"
              apiPath="/api/services"
              queryKey="/api/services"
              fields={serviceFields}
              renderItem={(s) => ({ primary: s.title, secondary: s.description.substring(0, 80) + "..." })}
              getDefaults={(count) => ({ icon: "Globe", title: "", description: "", features: "", sortOrder: count })}
              getFormValues={(s) => ({ icon: s.icon, title: s.title, description: s.description, features: s.features, sortOrder: s.sortOrder })}
            />
          </TabsContent>

          <TabsContent value="portfolio">
            <CrudEditor
              title="Project"
              apiPath="/api/projects"
              queryKey="/api/projects"
              fields={projectFields}
              renderItem={(p) => ({ primary: p.title, secondary: `${p.category} - ${p.description.substring(0, 60)}...` })}
              getDefaults={(count) => ({ title: "", category: "web", description: "", tags: "", gradient: "from-blue-600 to-cyan-500", sortOrder: count })}
              getFormValues={(p) => ({ title: p.title, category: p.category, description: p.description, tags: p.tags, gradient: p.gradient, sortOrder: p.sortOrder })}
            />
          </TabsContent>

          <TabsContent value="team">
            <CrudEditor
              title="Team Member"
              apiPath="/api/team"
              queryKey="/api/team"
              fields={teamFields}
              renderItem={(t) => ({ primary: t.name, secondary: t.role })}
              getDefaults={(count) => ({ name: "", role: "", initials: "", color: "from-blue-500 to-indigo-600", sortOrder: count })}
              getFormValues={(t) => ({ name: t.name, role: t.role, initials: t.initials, color: t.color, sortOrder: t.sortOrder })}
            />
          </TabsContent>

          <TabsContent value="testimonials">
            <CrudEditor
              title="Testimonial"
              apiPath="/api/testimonials"
              queryKey="/api/testimonials"
              fields={testimonialFields}
              renderItem={(t) => ({ primary: t.name, secondary: `${t.role}, ${t.company}` })}
              getDefaults={(count) => ({ quote: "", name: "", role: "", company: "", initials: "", color: "from-blue-500 to-cyan-500", sortOrder: count })}
              getFormValues={(t) => ({ quote: t.quote, name: t.name, role: t.role, company: t.company, initials: t.initials, color: t.color, sortOrder: t.sortOrder })}
            />
          </TabsContent>

          <TabsContent value="blog">
            <CrudEditor
              title="Blog Post"
              apiPath="/api/blog"
              queryKey="/api/blog"
              fields={blogFields}
              renderItem={(b) => ({ primary: b.title, secondary: `${b.category} - ${b.date}` })}
              getDefaults={(count) => ({ title: "", excerpt: "", category: "", readTime: "", date: "", gradient: "from-blue-600 to-indigo-600", sortOrder: count })}
              getFormValues={(b) => ({ title: b.title, excerpt: b.excerpt, category: b.category, readTime: b.readTime, date: b.date, gradient: b.gradient, sortOrder: b.sortOrder })}
            />
          </TabsContent>

          <TabsContent value="contact">
            <ContactInfoEditor />
          </TabsContent>

          <TabsContent value="footer">
            <FooterEditor />
          </TabsContent>

          <TabsContent value="sections">
            <SectionVisibilityEditor />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesViewer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const { data: authData, isLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const loggedIn = isLoggedIn !== null ? isLoggedIn : authData?.isAdmin;

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <AdminDashboard
      onLogout={() => {
        setIsLoggedIn(false);
        queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] });
      }}
    />
  );
}
