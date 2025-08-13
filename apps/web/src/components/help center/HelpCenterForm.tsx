import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { helpCenterSchema } from "@/src/validation/helpCenterSchema";

interface FormValues {
  fullname: string;
  email: string;
  message: string;
}

const HelpCenterForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(helpCenterSchema),
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
    },
  });
  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    form.reset();
  };

  return (
    <section className="w-full bg-white max-sm:px-8 sm:w-[78%]">
      <div className="bg-lightOrange mb-8 w-full p-3 text-xl font-bold max-sm:text-sm">
        <h2>Contact Us</h2>
      </div>
      <div className="px-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="pb-4">
                  <Label className="text-IEEEorange ps-1 sm:text-lg">
                    Full name
                  </Label>
                  <FormControl className="focus-visible:ring-lightOrange py-5 focus:border-0 max-sm:py-3">
                    <Input
                      className="placeholder:text-PlaceHolderGray max-sm:placeholder:text-sm"
                      placeholder="Enter your fullname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="pb-4">
                  <Label className="text-IEEEorange ps-1 sm:text-lg">
                    Email address
                  </Label>
                  <FormControl className="focus-visible:ring-lightOrange py-5 focus:border-0 max-sm:py-3">
                    <Input
                      className="placeholder:text-PlaceHolderGray max-sm:placeholder:text-sm"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="pb-4">
                  <Label className="text-IEEEorange ps-1 sm:text-lg">
                    Subject
                  </Label>
                  <FormControl className="focus-visible:ring-lightOrange py-5 focus:border-0 max-sm:py-3">
                    <Textarea
                      className="placeholder:text-PlaceHolderGray min-h-[150px] max-sm:placeholder:text-sm"
                      placeholder="Type your message here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="cursor-pointer rounded-md px-12 py-6 text-lg font-bold max-sm:px-8 max-sm:py-3 max-sm:text-sm"
              variant={"default"}
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default HelpCenterForm;
