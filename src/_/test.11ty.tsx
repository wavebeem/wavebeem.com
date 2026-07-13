import { h } from "preact";

type Data = { title: string };

export function data(): Data {
  return { title: "???" };
}

export function render({ title }: Data) {
  return <div>Hello world</div>;
}
