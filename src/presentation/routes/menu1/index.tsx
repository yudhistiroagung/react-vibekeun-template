import { createFileRoute } from '@tanstack/react-router';

import { Menu1ComponentA } from './-components/menu-1-component-a';
import { useMenu1 } from './menu1.hook';

export const Route = createFileRoute('/menu1/')({
  component: Menu1,
});

function Menu1() {
  const { mappedCount } = useMenu1();
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Menu 1 <br />
          {mappedCount}
        </h1>
      </div>
      <Menu1ComponentA />
    </div>
  );
}
