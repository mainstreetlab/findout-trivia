"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen">
      <div className="container mx-auto h-full bg-white md:max-w-md pt-4">
        <div className="flex flex-col items-center justify-between">
          <div className="text-center flex  flex-col items-center gap-6">
            <h1 className="text-6xl font-black  to-violet-700 from-purple-400 via-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
              Findout<span className="text-accent inline-flex">.</span>
            </h1>
            <p className="text-lg md:text-xl font-normal max-w-[320px] md:max-w-full">
              Findout is a trivia app that allows you to create quizzes and
              share them with friends to earn token rewards.
            </p>

            {/* CTA and socials */}
            <Link
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "mb-6",
              })}
              href="/create"
            >
              Create Quiz
            </Link>
          </div>

          {/* how it works section*/}
          <section className="pt-8 mt-4 flex flex-col gap-6 w-full border-t border-accent/30">
            {/* section text */}
            <div className="text-left flex flex-col gap-2">
              <span className="text-lg font-semibold ">How it works...</span>
              <h2 className="text-4xl font-black max-w-[300px] text-blue-600">
                Create Your Quiz
              </h2>
              <p className="text-lg max-w-[280px]">
                Here's how to use Findout Trivia in 3 easy steps.
              </p>
            </div>

            {/* how it works steps */}
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">Step 1</p>
              <div className="w-full h-72 bg-slate-300"></div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">Step 2</p>
              <div className="w-full h-72 bg-slate-300"></div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">Step 3</p>
              <div className="w-full h-72 bg-slate-300"></div>
            </div>
          </section>

          {/* CTA and socials */}
          <Link
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "my-6",
            })}
            href="/create"
          >
            Create Quiz
          </Link>
        </div>
      </div>
    </main>
  );
}