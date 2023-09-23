import dotenv from "dotenv";
import Replicate from "replicate";
import { NextResponse } from "next/server";

dotenv.config({ path: `.env.local` });

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || "",
  });
  try{
    const output = await replicate.run(
      "grabielairu/ghibli:4b82bb7dbb3b153882a0c34d7f2cbc4f7012ea7eaddb4f65c257a3403c9b3253",
      {
        input: {
          prompt,
        },
      }
    );
    return NextResponse.json(output);
  }
  catch(error:any){
    return NextResponse.json({error:error.message},{status:500});
  }

}
