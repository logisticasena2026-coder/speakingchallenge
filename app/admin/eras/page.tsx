import { obtenerTodasEras } from '@/actions/admin/eras/obtenerTodas';
import { TablaErasAdmin } from '@/components/admin/TablaErasAdmin';
import type { EraFull } from '@/components/admin/TablaErasAdmin';

export default async function AdminErasPage() {
  const { eras } = await obtenerTodasEras();

  return (
    <div className="p-8 max-w-250 mx-auto w-full min-w-0">
      <TablaErasAdmin erasIniciales={eras as EraFull[]} />
    </div>
  );
}
