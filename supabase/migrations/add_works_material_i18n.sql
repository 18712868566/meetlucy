alter table public.works
add column if not exists material_zh text;

alter table public.works
add column if not exists material_en text;

update public.works
set
  material_zh = coalesce(material_zh, material),
  material_en = coalesce(material_en, material)
where material is not null
  and (material_zh is null or material_en is null);

