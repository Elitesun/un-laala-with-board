import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Sparkles, Award } from "lucide-react";

interface ContentItem {
    id: string;
    name: string;
    creator: string;
    description: string;
    contents: number;
    views: number;
    date: string;
}

interface ContentTableProps {
    data: ContentItem[];
    onViewDetails: (id: string) => void;
}

const ContentTable: React.FC<ContentTableProps> = ({
    data,
    onViewDetails
}) => {
    return <div className="w-full overflow-auto rounded-lg shadow-sm border border-gray-100">
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                    <TableHead className="py-3 px-4 text-sm font-semibold text-gray-700">Nom</TableHead>
                    <TableHead className="py-3 px-4 text-sm font-semibold text-gray-700">Createur</TableHead>
                    <TableHead className="py-3 px-4 text-sm font-semibold text-gray-700">Description</TableHead>
                    <TableHead className="py-3 px-4 text-sm font-semibold text-gray-700 text-center">Contenues</TableHead>
                    <TableHead className="py-3 px-4 text-sm font-semibold text-gray-700 text-center">Vues</TableHead>
                    <TableHead className="py-3 px-4 text-sm font-semibold text-gray-700">Date</TableHead>
                    <TableHead className="py-3 px-4 text-sm font-semibold text-gray-700 text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) =>
                    <TableRow 
                        key={item.id} 
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                        <TableCell className="py-3 px-4 font-medium text-gray-800">
                            <div className="flex items-center">
                                {item.contents > 5 && <Sparkles className="h-4 w-4 text-yellow-500 mr-2" />}
                                {item.name}
                            </div>
                        </TableCell>
                        <TableCell className="py-3 px-4 text-gray-700">
                            <span>{item.creator}</span>
                        </TableCell>
                        <TableCell className="py-3 px-4 max-w-xs truncate text-gray-700">{item.description}</TableCell>
                        <TableCell className="py-3 px-4 text-center">
                            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 font-medium px-2.5 py-0.5 rounded-md">
                                {item.contents}
                            </Badge>
                        </TableCell>
                        <TableCell className="py-3 px-4 text-center">
                            {item.views > 0 ? (
                                <div className="flex justify-center">
                                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 px-2.5 py-0.5 rounded-md">
                                        {item.views}
                                    </Badge>
                                </div>
                            ) : (
                                <span className="text-gray-500">0</span>
                            )}
                        </TableCell>
                        <TableCell className="py-3 px-4">
                            <span className="text-sm font-medium text-gray-700">{item.date}</span>
                        </TableCell>
                        <TableCell className="py-3 px-4 text-right">
                            <Button
                                onClick={() => onViewDetails(item.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-3 py-1.5 text-sm transition-colors shadow-sm"
                                size="sm"
                            >
                                <Eye className="w-3.5 h-3.5 mr-1.5" /> Voir
                            </Button>
                        </TableCell>
                    </TableRow>)}

                {data.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                            <div className="flex flex-col items-center">
                                <Award className="w-12 h-12 text-gray-300 mb-3" />
                                <p>Aucun contenu trouvé</p>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>;
};

export default ContentTable;