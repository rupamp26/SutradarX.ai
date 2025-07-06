"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleMediateDispute } from "@/app/disputes/actions";
import { MediateDisputeOutput } from "@/ai/flows/mediate-dispute";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader2, FileText, Scale, Bot } from "lucide-react";

const disputeSchema = z.object({
  contractTerms: z.string().min(20, "Please provide the contract terms."),
  evidence: z.string().min(50, "Please provide detailed evidence from both parties."),
});

type DisputeFormValues = z.infer<typeof disputeSchema>;

export function DisputeMediator() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MediateDisputeOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<DisputeFormValues>({
    resolver: zodResolver(disputeSchema),
    defaultValues: {
      contractTerms: "",
      evidence: "",
    },
  });

  async function onSubmit(data: DisputeFormValues) {
    setLoading(true);
    setResult(null);
    try {
      const mediationResult = await handleMediateDispute(data);
      if (mediationResult) {
        setResult(mediationResult);
      } else {
        throw new Error("Mediation failed to produce a result.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mediate dispute. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      setResult(null);
      setLoading(false);
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Card className="shadow-lg bg-card overflow-hidden">
        <div className="p-6">
            <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-lg">
                <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
                <h2 className="text-xl font-headline font-semibold">AI-Powered Dispute Resolution</h2>
                <p className="text-muted-foreground mt-1">
                    Submit your case for an unbiased, AI-driven mediation. Get a summary of evidence and a suggested resolution in seconds.
                </p>
                <DialogTrigger asChild>
                    <Button className="mt-4">File a New Dispute</Button>
                </DialogTrigger>
            </div>
            </div>
        </div>
      </Card>
      
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">AI Dispute Mediator</DialogTitle>
          <DialogDescription>
            Provide the contract terms and evidence. Our AI will suggest a fair resolution.
          </DialogDescription>
        </DialogHeader>
        
        {!result ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="contractTerms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><FileText className="h-4 w-4" /> Contract Terms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the original escrow contract terms here..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="evidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Scale className="h-4 w-4" /> Evidence</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed, neutral summary of evidence from both parties..."
                        className="resize-y min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include arguments, timestamps, and any relevant communication.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Mediating..." : "Mediate Dispute"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="py-4 space-y-6">
            <h3 className="text-lg font-headline text-center font-semibold">Mediation Report</h3>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><FileText className="h-5 w-5 text-primary" /> Evidence Summary</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{result.summary}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><Scale className="h-5 w-5 text-primary" /> Suggested Resolution</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{result.suggestedResolution}</p>
              </CardContent>
            </Card>
            <DialogFooter>
                <Button onClick={() => { form.reset(); setResult(null); }} className="w-full">
                  Start New Mediation
                </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
