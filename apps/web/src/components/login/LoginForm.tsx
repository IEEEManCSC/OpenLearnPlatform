import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@components/ui/label";
import { Checkbox } from "@components/ui/checkbox";
import { User, Lock } from "lucide-react";
import { loginSchema } from "@/src/validation/loginSchema";

type FormValues = {
  username: string;
  password: string;
  terms?: boolean;
};

interface InputField {
  name: "username" | "password";
  placeholder: string;
  icon: string;
}

const formField: InputField[] = [
  { name: "username", placeholder: "Discord Username or Email", icon: "user" },
  { name: "password", placeholder: "Password", icon: "lock" },
];

function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:w-md lg:ms-40 w-3/4"
      >
        <div className="font-bold text-3xl p-2 border-b-[3px] rounded-b-sm border-b-IEEEorange text-IEEEorange">
          Login
        </div>

        {/* username & password */}
        {formField.map((f) => (
          <FormField
            control={form.control}
            name={f.name}
            key={f.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    {f.icon === "user" ? (
                      <User
                        color="gray"
                        className="absolute top-[23%] left-1"
                      />
                    ) : (
                      <Lock
                        color="gray"
                        className="absolute top-[23%] left-1"
                      />
                    )}
                    <Input
                      type={f.name === "username" ? "text" : "password"}
                      id={f.name}
                      placeholder={f.placeholder}
                      {...field}
                      className="p-6 ps-10 placeholder:text-lg focus-visible:ring-amber-100 focus:border-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* terms checkbox */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="terms"
                      checked={!!field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      className="w-5 h-5 data-[state=checked]:!bg-IEEEorange data-[state=checked]:border-IEEEorange"
                    />
                  </FormControl>
                  <Label
                    htmlFor="terms"
                    className="text-IEEEorange font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </FormItem>
              )}
            />
          </div>
          <Label className="border-b-2 border-b-IEEEorange text-IEEEorange font-bold pb-2">
            Forget password?
          </Label>
        </div>

        {/* submit button */}
        <Button
          type="submit"
          className="w-full bg-IEEEorange hover:bg-IEEEorange p-5 text-lg"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
