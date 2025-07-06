'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DisputeMediator } from "@/components/dispute-mediator";
import { Dispute } from "@/types";
import { motion } from 'framer-motion';

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export default function DisputesPage() {
  const disputes: Dispute[] = [];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="space-y-8 py-8"
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        <DisputeMediator />
      </motion.div>
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Dispute History</CardTitle>
            <CardDescription>
              View the status and details of your past and ongoing disputes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Escrow ID</TableHead>
                  <TableHead>Parties</TableHead>
                  <TableHead>Date Filed</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disputes.length > 0 ? (
                  disputes.map((dispute) => (
                    <TableRow key={dispute.id}>
                      <TableCell className="font-medium">{dispute.id}</TableCell>
                      <TableCell>{dispute.escrowId}</TableCell>
                      <TableCell>{dispute.parties}</TableCell>
                      <TableCell>{dispute.createdAt}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={cn("border", {
                            "bg-yellow-900/50 text-yellow-300 border-yellow-300/50": dispute.status === "Open",
                            "bg-primary/20 text-primary border-primary/50": dispute.status === "Mediating",
                            "bg-green-900/50 text-green-300 border-green-300/50": dispute.status === "Resolved",
                            "bg-gray-900/50 text-gray-300 border-gray-300/50": dispute.status === "Closed",
                          })}
                        >
                          {dispute.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No disputes found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
