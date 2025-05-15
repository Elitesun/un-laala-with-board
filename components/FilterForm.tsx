import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, Filter } from "lucide-react";

interface FilterFormProps {
    onSearch: (filter: {
        tab: string;
        title: string;
        content: string;
        startDate: string;
        endDate: string;
    }) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
    onSearch
}) => {
    const [filter, setFilter] = React.useState({
        tab: "validation",
        title: "",
        content: "",
        startDate: "",
        endDate: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            name,
            value
        } = e.target;
        setFilter(prev => ({
            ...prev,
            [name]: value
        }));

        // Debounce search
        setTimeout(() => {
            onSearch({
                ...filter,
                [name]: value
            });
        }, 300);
    };

    const handleTabChange = (value: string) => {
        setFilter(prev => ({
            ...prev,
            tab: value
        }));
        onSearch({
            ...filter,
            tab: value
        });
    };

    return <div className="w-full mb-6 space-y-6">
        <Tabs defaultValue="validation" onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full flex bg-orange-100 rounded-xl p-1 gap-2">
                <TabsTrigger
                    value="validation"
                    className="flex-1 text-lg transition-all duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-2"
                >
                    Validation
                </TabsTrigger>
                <TabsTrigger
                    value="promotion"
                    className="flex-1 text-lg transition-all duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-2"
                >
                    Promotion
                </TabsTrigger>
            </TabsList>
        </Tabs>

        <div className="flex justify-center py-8">
            <div className="playful-card max-w-6xl w-full px-8 py-8 md:px-12 md:py-10 rounded-2xl shadow-lg bg-white">
                <div className="flex items-center mb-6">
                    <Filter className="text-orange-500 mr-3" size={20} />
                    <h2 className="text-xl font-semibold text-gray-700">Filtres</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <Label htmlFor="title" className="text-sm font-medium flex items-center">
                            <Search className="h-4 w-4 text-orange-500 mr-2" />
                            Laala
                        </Label>
                        <div className="relative">
                            <Input
                                id="title"
                                name="title"
                                value={filter.title}
                                onChange={handleChange}
                                className="w-full pl-5 py-3 rounded-xl border-gray-200 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
                                placeholder="Rechercher par titre..."
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="content" className="text-sm font-medium flex items-center">
                            <Search className="h-4 w-4 text-orange-500 mr-2" />
                            Contenue
                        </Label>
                        <div className="relative">
                            <Input
                                id="content"
                                name="content"
                                value={filter.content}
                                onChange={handleChange}
                                className="w-full pl-5 py-3 rounded-xl border-gray-200 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
                                placeholder="Rechercher par contenu..."
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-3">
                        <Label htmlFor="startDate" className="text-sm font-medium flex items-center">
                            <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                            Date Debut
                        </Label>
                        <div className="relative">
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={filter.startDate}
                                onChange={handleChange}
                                className="w-full pl-5 py-3 rounded-xl border-gray-200 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="endDate" className="text-sm font-medium flex items-center">
                            <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                            Date fin
                        </Label>
                        <div className="relative">
                            <Input
                                id="endDate"
                                name="endDate"
                                type="date"
                                value={filter.endDate}
                                onChange={handleChange}
                                className="w-full pl-5 py-3 rounded-xl border-gray-200 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default FilterForm;