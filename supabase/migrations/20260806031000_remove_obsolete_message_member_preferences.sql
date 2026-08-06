do $$
declare
  obsolete_table_has_rows boolean;
begin
  if to_regclass('public.message_member_preferences') is null then
    return;
  end if;

  execute 'select exists (select 1 from public.message_member_preferences)'
    into obsolete_table_has_rows;

  if obsolete_table_has_rows then
    raise exception
      'Refusing to drop public.message_member_preferences because it contains data';
  end if;

  drop table public.message_member_preferences;
end
$$;
