/* eslint-disable @next/next/no-img-element */
"use client";
import { ArrowLeft, MessageCircle, Play, Pause, Volume2, VolumeX, User, Clock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import collection from "@/data/collection.json";
import laala from "@/data/laala.json";
import { useRouter } from "next/navigation";

/**
 * Page de détail d'un média
 * Affiche le média sélectionné (image ou vidéo) avec ses métadonnées
 * et permet d'interagir avec celui-ci
 */
const MediaDetailPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const mediaIndex = parseInt(params.id);

    // Vérifier si l'index est valide
    const isValidIndex = !isNaN(mediaIndex) &&
        laala.fichierAlbum &&
        mediaIndex >= 0 &&
        mediaIndex < laala.fichierAlbum.length;

    // Si l'index n'est pas valide, on récupère rien
    const mediaUrl = isValidIndex ? laala.fichierAlbum[mediaIndex] : null;
    const metadata = isValidIndex && laala.albumMetadata ? laala.albumMetadata[mediaIndex] : null;

    // État des contrôles vidéo
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Fonction pour vérifier si un média est une vidéo
    const isVideo = (url: string) => {
        return url.match(/\.(mp4|webm|ogg)($|\?)/i);
    };

    // Format de date plus esthétique
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Contrôles de lecture vidéo
    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    // Initialiser la vidéo au chargement
    useEffect(() => {
        if (mediaUrl && isVideo(mediaUrl) && videoRef.current) {
            videoRef.current.muted = isMuted;
            // Tenter la lecture automatique
            videoRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error("Autoplay failed:", error);
            });
        }
    }, [mediaUrl, isMuted]);

    // Revenir à la page précédente
    const goBack = () => {
        router.back();
    };

    // Si nous n'avons pas un index valide, afficher un message d'erreur
    if (!isValidIndex || !mediaUrl) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h1 className="text-2xl font-bold text-orange-500 mb-4">Média non trouvé</h1>
                    <p className="text-gray-600 mb-6">Le média que vous recherchez n&apos;existe pas ou a été supprimé.</p>
                    <button
                        onClick={goBack}
                        className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                        <ArrowLeft size={18} />
                        Retour à la galerie
                    </button>
                </div>
            </div>
        );
    }

    // Détermine si le média est une vidéo
    const isVideoMedia = isVideo(mediaUrl);

    return (
        <div className="min-h-screen bg-white">
            {/* Header - Navigation et titre */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={goBack}
                            className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-300 group"
                        >
                            <ArrowLeft size={20} className="text-gray-600 group-hover:text-orange-500 transition-colors duration-300" />
                        </button>
                        <h1 className="text-gray-800 font-medium">
                            {isVideoMedia ? 'Lecteur Vidéo' : 'Visionneuse d&apos;image'}
                        </h1>
                    </div>
                </div>
            </header>

            <main className="relative pt-16">
                <div className="container mx-auto px-4">
                    <div className="flex gap-8">
                        {/* Colonne de gauche - Média */}
                        <div className="flex-1 min-h-[calc(100vh-16rem)] bg-gray-50 rounded-xl overflow-hidden">
                            {isVideoMedia ? (
                                <video
                                    ref={videoRef}
                                    src={mediaUrl}
                                    className="w-full h-full object-contain"
                                    controls={false}
                                    playsInline
                                    muted={isMuted}
                                />
                            ) : (
                                <img
                                    src={mediaUrl}
                                    alt={metadata?.title || "Media"}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>

                        {/* Colonne de droite - Informations */}
                        <div className="w-[400px] flex-shrink-0">
                            <div className="sticky top-24">
                                <div className="flex flex-col gap-6">
                                    {/* Titre et métadonnées */}
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                            {metadata?.title || "Sans titre"}
                                        </h1>

                                        <div className="flex flex-col gap-3 text-gray-600 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-orange-400" />
                                                <span>{formatDate(metadata?.date || laala.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User size={16} className="text-orange-400" />
                                                <span>{collection.nomCrea}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MessageCircle size={16} className="text-orange-400" />
                                                <span>{metadata?.comments || 0} commentaires</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {laala.nom}
                                        </p>
                                    </div>

                                    {/* Contrôles vidéo, affichés uniquement pour les vidéos */}
                                    {isVideoMedia && (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={togglePlayPause}
                                                className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                                            >
                                                {isPlaying ?
                                                    <Pause size={20} className="text-gray-700" /> :
                                                    <Play size={20} className="text-gray-700" />
                                                }
                                            </button>

                                            <button
                                                onClick={toggleMute}
                                                className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                                            >
                                                {isMuted ?
                                                    <VolumeX size={20} className="text-gray-700" /> :
                                                    <Volume2 size={20} className="text-gray-700" />
                                                }
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MediaDetailPage; 