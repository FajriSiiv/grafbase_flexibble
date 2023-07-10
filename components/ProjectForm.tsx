"use client";
import { SessionInterface } from "@/common.types";
import { categoryFilters } from "@/constants";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import CategoryMenu from "./CategoryMenu";
import FormField from "./FormField";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleStateChange = (fieldName: string, value: string) => {};

  const form = {
    image: "",
    title: "",
    description: "",
    liveSiteURL: "",
    githubUrl: "",
    category: "",
  };

  return (
    <form action="" onSubmit={handleFormSubmit} className="flexStart form">
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
            alt="Project Poster"
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

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
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
        <button>Create</button>
      </div>
    </form>
  );
};

export default ProjectForm;
