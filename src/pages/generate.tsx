import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormGroup from "~/components/FormGroup";
import Input from "~/components/Input";

import { api } from "~/utils/api";

interface GenerateForm {
  prompt: string;
}

const Generate: NextPage = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const { register, handleSubmit, reset } = useForm<GenerateForm>({
    defaultValues: { prompt: "" },
  });

  const generateIcon = api.generate.generateIcon.useMutation();

  const _handleSubmit = async (data: GenerateForm) => {
    try {
      const response = await generateIcon.mutateAsync({ prompt: data.prompt });

      setImageUrl(response.imageUrl);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <form className="flex flex-col gap-4">
          <FormGroup>
            <label>Prompt</label>
            <Input type="text" {...register("prompt", { required: true })} />
          </FormGroup>

          <button
            className="mb-4 rounded bg-blue-400 px-4 py-2 hover:bg-blue-500"
            onClick={(e) => {
              e.preventDefault();
              void handleSubmit(_handleSubmit)(e);
            }}
          >
            Submit
          </button>
        </form>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt="An image of your generated prompt"
            width={150}
            height={150}
          />
        )}
      </main>
    </>
  );
};

export default Generate;
