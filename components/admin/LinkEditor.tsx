"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff, Trash2, Plus, X, Pencil, Check } from "lucide-react";
import { Link, LinkType } from "@/lib/types";

const LINK_TYPES: { value: LinkType; label: string }[] = [
  { value: "link",          label: "기본형" },
  { value: "overflow_card", label: "오버플로우 카드" },
  { value: "card",          label: "카드형" },
  { value: "youtube",       label: "유튜브" },
];

const EMPTY_FORM = { title: "", url: "", type: "link" as LinkType };

interface LinkEditorProps {
  links: Link[];
  onChange: (links: Link[]) => void;
}

export default function LinkEditor({ links, onChange }: LinkEditorProps) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function addLink() {
    if (!form.title.trim() || !form.url.trim()) return;
    const newLink: Link = {
      id: `link-${Date.now()}`,
      user_id: "",
      title: form.title.trim(),
      url: form.url.trim(),
      type: form.type,
      image_url: null,
      order: links.length + 1,
      is_visible: true,
      click_count: 0,
      created_at: new Date().toISOString(),
    };
    onChange([...links, newLink]);
    setForm(EMPTY_FORM);
    setShowForm(false);
    // TODO: Supabase 연동 후 INSERT
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex).map((l, i) => ({
      ...l,
      order: i + 1,
    }));
    onChange(reordered);
    // TODO: Supabase 연동 후 order 필드 일괄 UPDATE
  }

  function toggleVisible(id: string) {
    onChange(links.map((l) => (l.id === id ? { ...l, is_visible: !l.is_visible } : l)));
    // TODO: Supabase 연동 후 is_visible UPDATE
  }

  function deleteLink(id: string) {
    onChange(links.filter((l) => l.id !== id));
    // TODO: Supabase 연동 후 DELETE
  }

  function updateLink(id: string, patch: Partial<Pick<Link, "title" | "url" | "type">>) {
    onChange(links.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    // TODO: Supabase 연동 후 UPDATE
  }

  return (
    <div className="link-editor">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          <ul className="link-editor__list">
            {links.map((link) => (
              <SortableRow
                key={link.id}
                link={link}
                onToggle={() => toggleVisible(link.id)}
                onDelete={() => deleteLink(link.id)}
                onUpdate={(patch) => updateLink(link.id, patch)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {/* 추가 폼 */}
      {showForm ? (
        <div className="link-editor__form">
          <div className="admin-field">
            <label className="admin-field__label">제목</label>
            <input
              className="admin-field__input"
              placeholder="카카오톡 문의"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autoFocus
            />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">URL</label>
            <input
              className="admin-field__input"
              placeholder="https://"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">타입</label>
            <select
              className="admin-field__input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as LinkType })}
            >
              {LINK_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="link-editor__form-actions">
            <button className="link-editor__add-btn" onClick={addLink}>추가</button>
            <button
              className="link-editor__btn"
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
              aria-label="취소"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ) : (
        <button className="link-editor__new-btn" onClick={() => setShowForm(true)}>
          <Plus size={15} /> 링크 추가
        </button>
      )}
    </div>
  );
}

interface SortableRowProps {
  link: Link;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (patch: Partial<Pick<Link, "title" | "url" | "type">>) => void;
}

function SortableRow({ link, onToggle, onDelete, onUpdate }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: link.id });

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ title: link.title, url: link.url, type: link.type });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function saveEdit() {
    if (!draft.title.trim() || !draft.url.trim()) return;
    onUpdate(draft);
    setEditing(false);
  }

  function cancelEdit() {
    setDraft({ title: link.title, url: link.url, type: link.type });
    setEditing(false);
  }

  return (
    <li ref={setNodeRef} style={style} className="link-editor__row-wrap">
      {/* 기본 행 */}
      <div className="link-editor__row">
        <button className="link-editor__handle" {...attributes} {...listeners} aria-label="순서 변경">
          <GripVertical size={16} />
        </button>

        <span className={`link-editor__title ${!link.is_visible ? "link-editor__title--hidden" : ""}`}>
          {link.title}
        </span>

        <button className="link-editor__btn" onClick={() => setEditing((v) => !v)} aria-label="수정">
          <Pencil size={14} />
        </button>
        <button className="link-editor__btn" onClick={onToggle} aria-label="노출 토글">
          {link.is_visible ? <Eye size={15} /> : <EyeOff size={15} />}
        </button>
        <button className="link-editor__btn link-editor__btn--danger" onClick={onDelete} aria-label="삭제">
          <Trash2 size={15} />
        </button>
      </div>

      {/* 인라인 편집 폼 */}
      {editing && (
        <div className="link-editor__inline-form">
          <div className="admin-field">
            <label className="admin-field__label">제목</label>
            <input
              className="admin-field__input"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              autoFocus
            />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">URL</label>
            <input
              className="admin-field__input"
              value={draft.url}
              onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">타입</label>
            <select
              className="admin-field__input"
              value={draft.type}
              onChange={(e) => setDraft({ ...draft, type: e.target.value as LinkType })}
            >
              {LINK_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="link-editor__form-actions">
            <button className="link-editor__add-btn" onClick={saveEdit}>
              <Check size={14} /> 저장
            </button>
            <button className="link-editor__btn" onClick={cancelEdit} aria-label="취소">
              <X size={15} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
