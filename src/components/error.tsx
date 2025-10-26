"use client";

export default function Error(){
    console.log("An error occured")
  return (
    <div className=" flex w-full items-center justify-center place p-8 gap-16 sm:p-20">
      <h2>An Error Occured :(</h2>
    </div>
  );
}
