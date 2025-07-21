"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heart, Loader2, Sparkles } from "lucide-react";

import { generateLovePoem } from "@/ai/flows/generate-love-poem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  personalDetails: z.string().min(10, {
    message: "Por favor, cuéntame un poco más sobre Dany para que el poema sea especial.",
  }).max(500, {
    message: "Los detalles no deben exceder los 500 caracteres.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function AiPoemGenerator() {
  const [poem, setPoem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalDetails: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setPoem(null);
    try {
      const result = await generateLovePoem(data);
      if (result && result.poem) {
        setPoem(result.poem);
      } else {
        throw new Error("No se pudo generar el poema.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "¡Oh no! Algo salió mal.",
        description: "No se pudo crear el poema de amor. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-accent" />
                <CardTitle className="font-headline text-2xl">Un Poema Para Dany</CardTitle>
              </div>
              <CardDescription>
                Describe algo único sobre ella: un recuerdo, un chiste interno, su pasión por los girasoles... y la IA creará un poema solo para ella.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="personalDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalles personales</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Ama el olor a tierra mojada, siempre se ríe de mis malos chistes, y su sueño es viajar a Japón..."
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Heart className="mr-2 h-4 w-4" />
                )}
                {isLoading ? "Creando Magia..." : "Generar Poema"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
         <Card className="mt-8 text-center">
            <CardContent className="p-8">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Escribiendo versos de amor...</p>
            </CardContent>
          </Card>
      )}

      {poem && (
        <Card className="mt-8 animate-in fade-in-0">
          <CardHeader>
            <CardTitle className="font-headline text-center text-primary">Para ti, mi amor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-center font-serif text-lg leading-loose text-foreground/90">
              {poem}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
