import React, { useState } from "react";
import FilterForm from "./FilterForm";
import ContentTable from "./ContentTable";
import { useToast } from "@/components/ui/use-toast";
import { LayoutDashboard } from "lucide-react";

// Sample data for our dashboard
const initialData = [
    {
        id: "1",
        name: "Maison Canne à Sucre",
        creator: "Kekeli canne à sucre",
        description: "La maison CANNE À SUCRE est disponible pour mettre de la douceur dans vos visuels",
        contents: 8,
        views: 0,
        date: "2025-05-9",
    },
    {
        id: "2",
        name: "jock",
        creator: "etoilevida",
        description: "mon la-a-la",
        contents: 1,
        views: 0,
        date: "2025-05-9",
    },
    {
        id: "3",
        name: "le temps",
        creator: "Smileys",
        description: "Le temps qui passe et nous façonne",
        contents: 1,
        views: 0,
        date: "2025-05-9",
    },
    {
        id: "4",
        name: "CONSEIL",
        creator: "SEMEKONAWO",
        description: "DIEU D'ABORD",
        contents: 0,
        views: 0,
        date: "2025-05-9",
    },
    {
        id: "5",
        name: "motivation personnel",
        creator: "KAGNALE",
        description: "qui sait l'avenir",
        contents: 0,
        views: 0,
        date: "2025-05-9",
    },
    {
        id: "6",
        name: "Honoré le frick",
        creator: "Honoré le frick",
        description: "now time",
        contents: 0,
        views: 0,
        date: "2025-05-9",
    },
    {
        id: "7",
        name: "Lala",
        creator: "BALINGA",
        description: "Lucas",
        contents: 2,
        views: 0,
        date: "2025-05-9",
    },
];

const Dashboard: React.FC = () => {
    const [filteredData, setFilteredData] = useState(initialData);
    const { toast } = useToast();

    const handleSearch = (filter: {
        tab: string;
        title: string;
        content: string;
        startDate: string;
        endDate: string;
    }) => {
        // Filter the data based on the search criteria
        const filtered = initialData.filter((item) => {
            // Filter by title
            if (filter.title && !item.name.toLowerCase().includes(filter.title.toLowerCase())) {
                return false;
            }

            // Filter by content
            if (filter.content && !item.description.toLowerCase().includes(filter.content.toLowerCase())) {
                return false;
            }

            // Filter by date range
            if (filter.startDate && filter.endDate) {
                const itemDate = new Date(item.date);
                const startDate = new Date(filter.startDate);
                const endDate = new Date(filter.endDate);

                if (itemDate < startDate || itemDate > endDate) {
                    return false;
                }
            }

            return true;
        });

        setFilteredData(filtered);
    };

    const handleViewDetails = (id: string) => {
        const item = initialData.find((item) => item.id === id);

        toast({
            title: `Détails de ${item?.name}`,
            description: `Vous consultez les détails de ${item?.name} créé par ${item?.creator}`,
        });
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6">
            <div className="glass-effect rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-fade-in">
                <div className="bg-gradient-to-r from-orange-600 to-orange-300 py-6 px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <LayoutDashboard className="text-white h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-white">Gestion de Contenu</h1>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <FilterForm onSearch={handleSearch} />

                    <ContentTable
                        data={filteredData}
                        onViewDetails={handleViewDetails}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
