"use client";

import { useRef, useState } from "react";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Plus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ClientLogo } from "@/lib/types";

interface ClientLogoManagerProps {
  userId: string;
  logos: ClientLogo[];
  onChange: (logos: ClientLogo[]) => void;
}

export default function ClientLogoManager({ userId, logos, onChange }: ClientLogoManagerProps) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleAdd(file: File) {
    if (!name.trim()) return;
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${userId}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("logos").upload(path, file);
    if (error) {
      console.error("[logo upload]", error);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("logos").getPublicUrl(path);

    const { data: inserted } = await supabase
      .from("client_logos")
      .insert({ user_id: userId, name: name.trim(), image_url: publicUrl, order: logos.length + 1 })
      .select()
      .single();

    if (inserted) onChange([...logos, inserted]);
    setName("");
    setShowForm(false);
    setUploading(false);
  }

  async function handleDelete(logo: ClientLogo) {
    const supabase = createClient();
    const path = logo.image_url.split("/public/logos/")[1];
    if (path) await supabase.storage.from("logos").remove([path]);
    await supabase.from("client_logos").delete().eq("id", logo.id);
    onChange(logos.filter((l) => l.id !== logo.id));
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = logos.findIndex((l) => l.id === active.id);
    const newIndex = logos.findIndex((l) => l.id === over.id);
    const reordered = arrayMove(logos, oldIndex, newIndex).map((l, i) => ({
      ...l, order: i + 1,
    }));
    onChange(reordered);

    const supabase = createClient();
    await Promise.all(
      reordered.map((l) =>
        supabase.from("client_logos").update({ order: l.order }).eq("id", l.id)
      )
    );
  }

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={logos.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {logos.map((logo) => (
              <SortableLogoRow key={logo.id} logo={logo} onDelete={() => handleDelete(logo)} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {showForm ? (
        <div style={{ marginTop: "1.2rem" }}>
          <div className="admin-field">
            <label className="admin-field__label">기업 이름</label>
            <input
              className="admin-field__input"
              placeholder="삼성전자"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleAdd(f);
            }}
          />
          <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.8rem" }}>
            <button
              className="link-editor__add-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={!name.trim() || uploading}
            >
              {uploading ? "업로드 중…" : "이미지 선택"}
            </button>
            <button
              className="link-editor__btn"
              onClick={() => { setShowForm(false); setName(""); }}
              aria-label="취소"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="link-editor__new-btn"
          style={{ marginTop: "1.2rem" }}
          onClick={() => setShowForm(true)}
        >
          <Plus size={15} /> 로고 추가
        </button>
      )}
    </div>
  );
}

function SortableLogoRow({ logo, onDelete }: { logo: ClientLogo; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: logo.id });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        listStyle: "none",
      }}
    >
      <div className="link-editor__row">
        <button className="link-editor__handle" {...attributes} {...listeners} aria-label="순서 변경">
          <GripVertical size={16} />
        </button>
        <div style={{
          width: 28, height: 28, borderRadius: 4, overflow: "hidden",
          flexShrink: 0,
          background: logo.image_url ? "transparent" : "var(--sb-hairline)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {logo.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo.image_url} alt={logo.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          )}
        </div>
        <span className="link-editor__title" style={{ flex: 1 }}>{logo.name}</span>
        <button className="link-editor__btn link-editor__btn--danger" onClick={onDelete} aria-label="삭제">
          <Trash2 size={15} />
        </button>
      </div>
    </li>
  );
}
