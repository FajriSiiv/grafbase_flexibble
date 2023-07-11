"use client";
import { SessionInterface } from "@/common.types";
import { categoryFilters } from "@/constants";
import { createNewProject, fetchToken } from "@/lib/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Button from "./Button";
import CategoryMenu from "./CategoryMenu";
import FormField from "./FormField";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmit(true);

    const token = await fetchToken();

    try {
      if (type === "create") {
        // create project
        await createNewProject(form, session?.user?.id, token);

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmit(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    console.log(form);
  };

  const [isSubmit, setIsSubmit] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    liveSiteURL: "",
    githubUrl: "",
    category: "",
    image: "",
  });

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          id="image"
          onChange={handleChangeImage}
        />
        {!form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Your project description...."
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteURL}
        placeholder="https://github.com/"
        setState={(value) => handleStateChange("liveSiteURL", value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/FajriSiiv"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      {/* Custom Category */}
      <CategoryMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      {/* Button */}
      <div className="flexStart w-full">
        <Button
          title={
            isSubmit
              ? `${type === "create" ? "Creating" : "Editing"} `
              : ` ${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmit ? "" : "/plus.svg"}
          isSubmitting={isSubmit}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
