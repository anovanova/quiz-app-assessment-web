"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  Q1: z.string().min(1, "Answer is required").optional(),
  Q2: z.string().min(1, "Answer is required").optional(),
  Q3: z.string().min(1, "Answer is required").optional(),
  Q4: z.string().min(1, "Answer is required").optional(),
  Q5: z.string().min(1, "Answer is required").optional(),
  Q6: z.string().min(1, "Answer is required").optional(),
  Q7: z.string().min(1, "Answer is required").optional(),
  Q8: z.string().min(1, "Answer is required").optional(),
  Q9: z
    .array(z.string())
    .min(1, "Please select at least one answer.")
    .optional(),
  Q10: z
    .array(z.string())
    .min(1, "Please select at least one answer.")
    .optional(),
  Q11: z
    .array(z.string())
    .min(1, "Please select at least one answer.")
    .optional(),
  Q12: z
    .array(z.string())
    .min(1, "Please select at least one answer.")
    .optional(),
});

interface Questions {
  data: [
    {
      id:
        | "Q1"
        | "Q2"
        | "Q3"
        | "Q4"
        | "Q5"
        | "Q6"
        | "Q7"
        | "Q8"
        | "Q9"
        | "Q10"
        | "Q11"
        | "Q12"
        | `Q9.${number}`
        | `Q10.${number}`
        | `Q11.${number}`
        | `Q12.${number}`;
      type: string;
      question: string;
      choices?: [string];
    }
  ];
}

export default function QuizComponent({ data }: Questions) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Q1: "",
      Q2: "",
      Q3: "",
      Q4: "",
      Q5: "",
      Q6: "",
      Q7: "",
      Q8: "",
      Q9: [],
      Q10: [],
      Q11: [],
      Q12: [],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await fetch("/api/grade", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      return (
        <div className="h-screen w-screen flex justify-center">
          <div className="w-auto h-auto text-center flex items-center">
            <p className="font-bold text-red-600">Error {response.status}</p>
          </div>
        </div>
      );
    }

    if (response.status === 200) {
      const resData = await response.json();
      const queryString = new URLSearchParams({
        data: JSON.stringify(resData),
      }).toString();
      router.push(`/grade?${queryString}`, { scroll: false });
    }
  }
  return (
    <div className="w-full">
      <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {data.map((item) => {
            return (
              <Controller
                key={item.id}
                name={item.id}
                control={form.control}
                render={({ field, fieldState }) =>
                  inputType(
                    item.type,
                    field,
                    fieldState,
                    item.question,
                    item?.choices
                  )
                }
              />
            );
          })}
        </FieldGroup>
      </form>
      <div className="w-full flex flex-row-reverse pt-8">
        <Button size="lg" type="submit" form="form">
          Submit
        </Button>
      </div>
    </div>
  );
}

function inputType(
  type: string,
  field: ControllerRenderProps<FieldValues, string>,
  fieldState: {
    invalid: boolean;
    isTouched?: boolean;
    isDirty?: boolean;
    isValidating?: boolean;
    error?: { message?: string | undefined } | undefined;
  },
  question: string,
  choices: [string] | undefined
) {
  if (type === "text") {
    return (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor="form">{question}</FieldLabel>
        <Input
          {...field}
          id="form"
          aria-invalid={fieldState.invalid}
          placeholder="Answer"
          autoComplete="off"
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    );
  }
  if (type === "radio") {
    return (
      <FieldSet>
        <FieldLegend variant="label">{question}</FieldLegend>
        <RadioGroup
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
        >
          {choices!.map((item, index) => {
            return (
              <Field key={index} orientation="horizontal">
                <RadioGroupItem
                  aria-invalid={fieldState.invalid}
                  value={item}
                />
                <FieldLabel htmlFor={item} className="font-normal">
                  {item}
                </FieldLabel>
              </Field>
            );
          })}
        </RadioGroup>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldSet>
    );
  }

  return (
    <FieldSet>
      <FieldLegend variant="label">
        {question}
        <i className="font-light"> (Select all that apply)</i>
      </FieldLegend>
      <FieldGroup data-slot="checkbox-group">
        {choices!.map((item, index) => {
          return (
            <Field
              key={index}
              orientation="horizontal"
              data-invalid={fieldState.invalid}
            >
              <Checkbox
                id={`form`}
                name={field.name}
                aria-invalid={fieldState.invalid}
                checked={field.value.includes(item)}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...field.value, item]
                    : field.value.filter((value: string) => value !== item);
                  field.onChange(newValue);
                }}
              />
              <FieldLabel htmlFor={`form`} className="font-normal">
                {item}
              </FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        })}
      </FieldGroup>
    </FieldSet>
  );
}
