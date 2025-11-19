"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends z.FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ sucess: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handeSubmit: SubmitHandler<T> = async () => {
    // TODO: Authenticate User
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        {buttonText}

        <form
          id="username-input"
          onSubmit={form.handleSubmit(handeSubmit)}
          className="mt-10 space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FieldGroup key={field}>
              <Controller
                name={field as Path<T>}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex w-full flex-col gap-2.5"
                  >
                    <FieldLabel
                      htmlFor="form-input"
                      className="paragraph-medium text-dark400_light700"
                    >
                      {field.name === "email"
                        ? "Email Address"
                        : field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder={field.name}
                      type={field.name === "password" ? "password" : "text"}
                      required
                      className="paragraph-regular background-light-900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          ))}
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <div
            className="flex
            flex-col w-full
            gap-2"
          >
            <Button
              disabled={form.formState.isSubmitting}
              className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-lighjt-900!"
            >
              {form.formState.isSubmitting
                ? buttonText === "Sign In"
                  ? "Signing In..."
                  : "Signing Up..."
                : buttonText}
            </Button>
            {formType === "SIGN_IN" ? (
              <p>
                Don't have an account?{" "}
                <Link
                  href={ROUTES.SIGN_UP}
                  className="paragraph-semibold primary-text-gradient"
                >
                  Sign Up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link
                  href={ROUTES.SIGN_IN}
                  className="paragraph-semibold primary-text-gradient"
                >
                  Sign In
                </Link>
              </p>
            )}
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
