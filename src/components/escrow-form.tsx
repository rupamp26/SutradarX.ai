
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle, Users, FileText, Landmark } from "lucide-react";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  payerName: z.string().min(2, "Name must be at least 2 characters."),
  payerUpi: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format."),
  payerWallet: z.string().min(10, "Aptos wallet address is required."),
  payeeName: z.string().min(2, "Name must be at least 2 characters."),
  payeeUpi: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format."),
  payeeWallet: z.string().min(10, "Aptos wallet address is required."),
  amount: z.coerce.number().positive("Amount must be positive."),
  terms: z.string().min(20, "Please provide detailed terms for the agreement."),
});

type FormValues = z.infer<typeof formSchema>;
type FieldName = keyof FormValues;

const steps = [
  { id: "Parties", name: "Parties", icon: Users, fields: ['payerName', 'payerUpi', 'payerWallet', 'payeeName', 'payeeUpi', 'payeeWallet'] as FieldName[] },
  { id: "Terms", name: "Amount & Terms", icon: FileText, fields: ['amount', 'terms'] as FieldName[] },
  { id: "Review", name: "Review & Deploy", icon: CheckCircle, fields: [] as FieldName[] },
];

export function EscrowForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payerName: "",
      payerUpi: "",
      payerWallet: "",
      payeeName: "",
      payeeUpi: "",
      payeeWallet: "",
      amount: undefined,
      terms: "",
    },
    mode: "onTouched",
  });

  const handleNextStep = async () => {
    const fields = steps[currentStep].fields;
    const isValid = await form.trigger(fields, { shouldFocus: true });

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  function processForm(data: FormValues) {
    // Final submission logic
    console.log("Deploying contract with data:", data);
    alert("Contract deployment initiated!");
  }

  const formData = form.getValues();

  return (
    <div>
      <nav className="mb-8">
        <ol className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => (
            <li key={step.name} className="flex items-center space-x-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {index < currentStep ? <CheckCircle className="h-6 w-6" /> : <step.icon className="h-5 w-5" />}
              </div>
              <span className={`font-medium ${index === currentStep ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</span>
              {index < steps.length - 1 && <div className="h-px w-16 bg-border" />}
            </li>
          ))}
        </ol>
      </nav>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Payer Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField name="payerName" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g. Rohan Sharma" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField name="payerUpi" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>UPI ID</FormLabel><FormControl><Input placeholder="rohan@upi" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField name="payerWallet" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Aptos Wallet Address</FormLabel><FormControl><Input placeholder="0x..." {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Payee Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                           <FormField name="payeeName" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g. Priya Mehta" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField name="payeeUpi" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>UPI ID</FormLabel><FormControl><Input placeholder="priya@upi" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField name="payeeWallet" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Aptos Wallet Address</FormLabel><FormControl><Input placeholder="0x..." {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </CardContent>
                    </Card>
                </div>
              )}

              {currentStep === 1 && (
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5"/> Escrow Amount & Terms</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField name="amount" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Escrow Amount (₹)</FormLabel>
                                <FormControl>
                                <div className="relative">
                                    <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input type="number" placeholder="5000" className="pl-10" {...field} />
                                </div>
                                </FormControl>
                            <FormMessage /></FormItem>
                        )}/>
                        <FormField name="terms" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Agreement Terms</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g. Payment for website design project, to be released upon completion of milestones..." className="resize-y min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage /></FormItem>
                        )}/>
                    </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <div>
                  <h3 className="text-lg font-headline font-semibold mb-4 text-center">Review Your Escrow Contract</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader><CardTitle>Parties</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Payer</h4>
                          <p>{formData.payerName}</p>
                          <p className="text-sm text-muted-foreground">{formData.payerUpi}</p>
                          <p className="text-sm text-muted-foreground truncate">{formData.payerWallet}</p>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold">Payee</h4>
                          <p>{formData.payeeName}</p>
                          <p className="text-sm text-muted-foreground">{formData.payeeUpi}</p>
                          <p className="text-sm text-muted-foreground truncate">{formData.payeeWallet}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Amount</h4>
                          <p className="text-xl font-bold font-headline">₹{formData.amount.toLocaleString('en-IN')}</p>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold">Terms</h4>
                          <p className="text-sm text-muted-foreground">{formData.terms}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNextStep}>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit">
                Deploy Contract
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
