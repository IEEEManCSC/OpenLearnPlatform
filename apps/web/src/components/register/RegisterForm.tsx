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
import { User, Lock, Mail, Hash } from "lucide-react";
import { z } from "zod";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

// Registration form values with all necessary fields
type FormValues = {
  username: string;
  password: string;
  email: string;
  discordUsername: string;
  terms: boolean;
};

// Proper registration schema
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  discordUsername: z.string().min(1, "Discord username is required"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// Updated interface for registration fields
interface InputField {
  name: "username" | "password" | "email" | "discordUsername";
  placeholder: string;
  icon: "user" | "lock" | "mail" | "hash";
  type: string;
}

// Complete form fields array for registration
const formFields: InputField[] = [
  {
    name: "username",
    placeholder: "Enter your username",
    icon: "user",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Enter your email",
    icon: "mail",
    type: "email",
  },
  {
    name: "discordUsername",
    placeholder: "Enter Discord username",
    icon: "user",
    type: "text",
  },
  {
    name: "password",
    placeholder: "Enter your password",
    icon: "lock",
    type: "password",
  },
];

function RegisterForm() {
  // Changed function name from LoginForm to RegisterForm
  const { setField } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      discordUsername: "",
      terms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setField("username", data.username);
      setField("password", data.password);
      setField("email", data.email);
      setField("discordUsername", data.discordUsername);
      navigate("/choose");
      // You might want to add success handling here
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "user":
        return <User color="gray" className="absolute top-[23%] left-1" />;
      case "lock":
        return <Lock color="gray" className="absolute top-[23%] left-1" />;
      case "mail":
        return <Mail color="gray" className="absolute top-[23%] left-1" />;
      case "hash":
        return <Hash color="gray" className="absolute top-[23%] left-1" />;
      default:
        return <User color="gray" className="absolute top-[23%] left-1" />;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-3/4 space-y-8 lg:ms-40 lg:w-md"
      >
        <div className="border-b-IEEEorange text-IEEEorange rounded-b-sm border-b-[3px] p-2 text-3xl font-bold">
          Register
        </div>

        {/* All registration fields */}
        {formFields.map((f) => (
          <FormField
            control={form.control}
            name={f.name}
            key={f.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    {renderIcon(f.icon)}
                    <Input
                      type={f.type}
                      id={f.name}
                      placeholder={f.placeholder}
                      {...field}
                      className="p-6 ps-10 placeholder:text-lg focus:border-0 focus-visible:ring-amber-100"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Terms and conditions checkbox */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-2">
                  <FormControl>
                    <Checkbox
                      id="terms"
                      checked={!!field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      className="data-[state=checked]:!bg-IEEEorange data-[state=checked]:border-IEEEorange h-5 w-5"
                    />
                  </FormControl>
                  <Label htmlFor="terms" className="text-sm">
                    I accept the terms and conditions
                  </Label>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="bg-IEEEorange hover:bg-IEEEorange w-full p-5 text-lg"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
