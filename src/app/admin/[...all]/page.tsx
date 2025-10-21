export default async function AllProducts({params} : {params : {all : string[]}}) {
  const {all} = await params;
  all?.map(e => console.log(e));

  
  return (
    <div>
      <h1 className="text-4xl font-bold">All Products</h1>
    </div>
  );
}
