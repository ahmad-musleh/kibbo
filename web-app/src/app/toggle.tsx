"use client";
import { ToggleSwitch } from "flowbite-react";

export default function Toggle({
  text,
  override = false,
  state,
  updateToggleState,
}: {
  text: string;
  override?: boolean;
  state: boolean;
  updateToggleState: Function;
}) {
  if (override) {
    return (
      <>
        <label className="relative my-2 inline-flex w-full cursor-pointer justify-between rounded-lg bg-[#505051] p-4">
          <span className=""> {text} </span>
          <ToggleSwitch
            className=""
            checked={state}
            label=""
            onChange={() => updateToggleState()}
          />
        </label>
      </>
    );
  } else {
    return (
      <>
        <label className="relative my-2 inline-flex w-full cursor-pointer justify-between rounded-lg bg-[#505051]/25 p-4">
          <span className="text-white/50"> {text} </span>
          <ToggleSwitch
            className=""
            checked={state}
            disabled
            label=""
            onChange={() => updateToggleState()}
          />
        </label>
      </>
    );
  }
}
