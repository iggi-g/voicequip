import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const History = () => {
  const historyItems = [
    { id: 1, type: "Recording", title: "Team Meeting", date: "2023-04-15 14:30" },
    { id: 2, type: "Transcription", title: "Client Call", date: "2023-04-14 10:15" },
    { id: 3, type: "Note", title: "Project Ideas", date: "2023-04-13 09:45" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Activity History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default History;