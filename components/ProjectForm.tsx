"use client";
import { SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { ChangeEvent } from "react";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};

  const form = {
    image: "",
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
    </form>
  );
};

export default ProjectForm;

// 2:03:00
