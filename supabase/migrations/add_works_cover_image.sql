alter table public.works
add column if not exists cover_image text;

update public.works
set cover_image = coalesce(cover_image, image)
where image is not null
  and cover_image is null;

