'use client';

import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaMotorcycle, FaWalking, FaExternalLinkAlt, FaTimes, FaLocationArrow, FaLayerGroup } from 'react-icons/fa';
import axios from 'axios';

// Fix Leaflet icon issue
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const JKLU_COORDS: [number, number] = [26.7238, 75.8371];
const CAMPUS_ZOOM = 16;

type TransportMode = 'car' | 'bike' | 'walking';

interface RouteInfo {
    distance: number; // in meters
    duration: number; // in seconds
}

// Map Updater Component to handle programmatic panning/zooming
function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom, { animate: true });
    }, [center, zoom, map]);
    return null;
}

export default function InteractiveMap({ onClose }: { onClose: () => void }) {
    const [viewMode, setViewMode] = useState<'normal' | 'satellite'>('normal');
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [transportMode, setTransportMode] = useState<TransportMode>('car');
    const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
    const [loadingDirections, setLoadingDirections] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Dark Mode Tile Layer (CartoDB Dark Matter)
    const normalLayer = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    const satelliteLayer = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

    const handleGetDirections = useCallback(async () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setLoadingDirections(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const userPos: [number, number] = [latitude, longitude];
                setUserLocation(userPos);

                try {
                    // OSRM Service for directions
                    // Profiles: car -> driving, bike -> bicycle (OSRM bicycle profile is sometimes 'bike'), walking -> foot
                    const profile = transportMode === 'car' ? 'driving' : transportMode === 'bike' ? 'driving' : 'foot';
                    const url = `https://router.project-osrm.org/route/v1/${profile}/${longitude},${latitude};${JKLU_COORDS[1]},${JKLU_COORDS[0]}?overview=false`;

                    const response = await axios.get(url);
                    if (response.data.routes && response.data.routes.length > 0) {
                        const route = response.data.routes[0];
                        setRouteInfo({
                            distance: route.distance,
                            duration: route.duration
                        });
                    }
                } catch (err) {
                    console.error("Failed to fetch directions:", err);
                    setError("Could not calculate directions");
                } finally {
                    setLoadingDirections(false);
                }
            },
            (err) => {
                console.error("Geolocation error:", err);
                setError("Location permission denied");
                setLoadingDirections(false);
            }
        );
    }, [transportMode]);

    const formatDistance = (m: number) => {
        if (m < 1000) return `${Math.round(m)} m`;
        return `${(m / 1000).toFixed(1)} km`;
    };

    const formatDuration = (s: number) => {
        const mins = Math.round(s / 60);
        if (mins < 60) return `${mins} mins`;
        const hrs = Math.floor(mins / 60);
        const remainingMins = mins % 60;
        return `${hrs} hr ${remainingMins} mins`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
        >
            <div className="relative w-full max-w-6xl h-[80vh] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all sm:hidden"
                >
                    <FaTimes />
                </button>

                {/* Sidebar / Info Panel */}
                <div className="w-full md:w-80 p-6 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-white/10 z-10 bg-[#0a0a0a]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-gang tracking-wider text-spardha-gold uppercase">Campus Location</h2>
                            <p className="text-gray-400 text-sm mt-1">JK Lakshmipat University, Jaipur</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="hidden sm:block p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleGetDirections}
                            disabled={loadingDirections}
                            className="w-full flex items-center justify-center gap-3 bg-spardha-gold hover:bg-spardha-gold/80 text-black py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                        >
                            <FaLocationArrow className={loadingDirections ? "animate-pulse" : ""} />
                            {loadingDirections ? "Getting Location..." : "Get Directions"}
                        </button>

                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'car', icon: <FaCar />, label: 'Car' },
                                { id: 'bike', icon: <FaMotorcycle />, label: 'Bike' },
                                { id: 'walking', icon: <FaWalking />, label: 'Walk' }
                            ].map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => setTransportMode(mode.id as TransportMode)}
                                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${transportMode === mode.id
                                            ? 'border-spardha-gold bg-spardha-gold/10 text-spardha-gold'
                                            : 'border-white/5 bg-white/5 text-gray-500 hover:text-white'
                                        }`}
                                >
                                    {mode.icon}
                                    <span className="text-[10px] uppercase font-bold">{mode.label}</span>
                                </button>
                            ))}
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs text-center">{error}</p>
                        )}

                        <AnimatePresence>
                            {routeInfo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-white/5 rounded-2xl border border-white/10"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-500 uppercase tracking-widest">Travel Info</span>
                                        <span className="text-xs text-spardha-gold font-bold">{transportMode.toUpperCase()}</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-2xl font-bold text-white">{formatDuration(routeInfo.duration)}</p>
                                            <p className="text-sm text-gray-400">{formatDistance(routeInfo.distance)} away</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-auto space-y-3">
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${JKLU_COORDS[0]},${JKLU_COORDS[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3 border border-white/10 hover:bg-white/5 rounded-xl text-white text-sm transition-all"
                        >
                            <FaExternalLinkAlt size={12} />
                            Open in Google Maps
                        </a>

                        <button
                            onClick={() => setViewMode(prev => prev === 'normal' ? 'satellite' : 'normal')}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 text-sm transition-all"
                        >
                            <FaLayerGroup size={12} />
                            Switch to {viewMode === 'normal' ? 'Satellite' : 'Map'} View
                        </button>
                    </div>
                </div>

                {/* Map Container */}
                <div className="flex-1 relative bg-zinc-900 overflow-hidden">
                    <MapContainer
                        center={JKLU_COORDS}
                        zoom={CAMPUS_ZOOM}
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                        attributionControl={false}
                    >
                        <TileLayer
                            url={viewMode === 'normal' ? normalLayer : satelliteLayer}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />

                        <MapUpdater
                            center={userLocation || JKLU_COORDS}
                            zoom={userLocation ? 13 : CAMPUS_ZOOM}
                        />

                        <Marker position={JKLU_COORDS}>
                            <Popup minWidth={200}>
                                <div className="p-2">
                                    <h3 className="font-bold text-black">JK Lakshmipat University</h3>
                                    <p className="text-xs text-gray-600">Mahapura, Jaipur, Rajasthan</p>
                                    <p className="text-[10px] mt-1 text-spardha-gold font-bold">SPARDHA &apos;26 VENUE</p>
                                </div>
                            </Popup>
                        </Marker>

                        {userLocation && (
                            <Marker position={userLocation}>
                                <Popup>Your Current Location</Popup>
                            </Marker>
                        )}

                        <ZoomControl position="bottomright" />
                    </MapContainer>

                    {/* Desktop Zoom Overlay Hint */}
                    <div className="absolute top-4 left-4 z-[100] px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] text-white/70 uppercase tracking-widest hidden md:block">
                        Interactive Campus Preview
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

