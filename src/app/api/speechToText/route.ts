import OpenAI from "openai";
import { env } from "~/env";
import fs, { read } from "fs";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();

  const base64Audio = body.audio;

  // convert the base64 audio to buffer
  const audio = Buffer.from(base64Audio, "base64");

  // define the path to store temporary waf file
  // we generate randomUUID to prevent errors when two or more requests are processing simultaneously
  const filePath = `tmp/input${crypto.randomUUID}.wav`;

  try {
    // write the audio to a temporary wav file synchronously
    fs.writeFileSync(filePath, audio);

    // create a readable stream from the temporary wav file
    const readStream = fs.createReadStream(filePath);

    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });

    // remove file after processing
    fs.unlinkSync(filePath);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
}
