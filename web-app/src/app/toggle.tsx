'use client';
import { ToggleSwitch } from "flowbite-react";

export default function Toggle({text, state , updateToggleState}: {text: string, state: boolean ,updateToggleState: Function}) {

    return (
        <>
            <label className="relative inline-flex justify-between cursor-pointer my-2 p-4 w-full rounded-lg bg-[#505051]">
                <span className=""> {text} </span>
                <ToggleSwitch className="" checked={state} label="" onChange={() => updateToggleState()} />
            </label>
        </>
    )
}