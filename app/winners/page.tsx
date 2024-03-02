import { edenApi } from "@/lib/api";
import { DataTable } from "./data-table";
import { Winner, columns } from "./columns";

async function getData(): Promise<Winner[]> {
  const { data } = await edenApi.api["get-winners"].get({
    $fetch: {
      cache: "no-cache"
    }
  });
  if (!data) return [];
  return data;
}

export default async function Winners() {
  const data = await getData()

  return (
    <div className="flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1">
      <div className="m-5 flex flex-col w-4/5 text-center justify-between p-1">
        <div className="text-2xl font-bold text-white mt-2">得獎名單</div>

        <div className="mt-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
