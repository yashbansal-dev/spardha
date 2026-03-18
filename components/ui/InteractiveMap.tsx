'use client';

import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, Polyline } from 'react-leaflet';
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

// Precise coordinates for the Circular Building at JKLU
const JKLU_COORDS: [number, number] = [26.8362, 75.6476];
const CAMPUS_ZOOM = 17; // Closer zoom for better building view

type TransportMode = 'car' | 'bike' | 'walking';

interface RouteInfo {
    distance: number; // in meters
    duration: number; // in seconds
}

// Map Updater Component - Keeps focus on JKLU buildings
function MapUpdater({ userLocation }: { userLocation: [number, number] | null }) {
    const map = useMap();
    
    useEffect(() => {
        if (userLocation) {
            // Only fit bounds if distance is < 100km, otherwise keep focus on destination
            const bounds = L.latLngBounds([userLocation, JKLU_COORDS]);
            const dist = map.distance(userLocation, JKLU_COORDS);
            
            if (dist < 100000) { // 100km
                map.fitBounds(bounds, { padding: [50, 50], animate: true });
            } else {
                // Too far, keep focus on the campus so they see the buildings
                map.setView(JKLU_COORDS, CAMPUS_ZOOM, { animate: true });
            }
        } else {
            map.setView(JKLU_COORDS, CAMPUS_ZOOM, { animate: true });
        }
    }, [userLocation, map]);
    
    return null;
}

export default function InteractiveMap({ onClose }: { onClose: () => void }) {
    const [viewMode, setViewMode] = useState<'normal' | 'satellite'>('satellite'); // Default to satellite as requested
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
                setError("Locate permission denied. Showing venue only.");
                setLoadingDirections(false);
            }
        );
    }, [transportMode]);

    // Auto-fetch directions on mount
    useEffect(() => {
        handleGetDirections();
    }, [handleGetDirections]);

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
            <div className="relative w-full max-w-6xl h-[80vh] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-[0_0_80px_-15px_rgba(234,179,8,0.2)]">

                {/* Close Button Mobile */}
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
                            <h2 className="text-2xl font-gang tracking-wider text-spardha-gold uppercase">Campus Venue</h2>
                            <p className="text-gray-400 text-sm mt-1 leading-tight">JK Lakshmipat University, Jaipur</p>
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
                            className="w-full flex items-center justify-center gap-3 bg-spardha-gold hover:bg-spardha-gold/80 text-black py-4 rounded-xl font-bold transition-all disabled:opacity-50 shadow-xl"
                        >
                            <FaLocationArrow className={loadingDirections ? "animate-pulse" : ""} />
                            {loadingDirections ? "Locating..." : "Recalculate Route"}
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
                                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${transportMode === mode.id
                                            ? 'border-spardha-gold bg-spardha-gold/10 text-spardha-gold'
                                            : 'border-white/5 bg-white/5 text-gray-500 hover:text-white'
                                        }`}
                                >
                                    {mode.icon}
                                    <span className="text-[10px] uppercase font-black">{mode.label}</span>
                                </button>
                            ))}
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs text-center bg-red-400/10 py-2 rounded-lg">{error}</p>
                        )}

                        <AnimatePresence>
                            {routeInfo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-spardha-gold/5 rounded-2xl border border-spardha-gold/20"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">ETA</span>
                                        <span className="text-xs text-spardha-gold font-black">{transportMode.toUpperCase()}</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-3xl font-bold text-white leading-none">{formatDuration(routeInfo.duration)}</p>
                                            <p className="text-sm text-gray-400 mt-2">{formatDistance(routeInfo.distance)} away</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-auto space-y-3">
                        <a
                            href="https://www.google.com/maps/place/JK+Lakshmipat+University/@26.836603,75.650304,16z/data=!4m6!3m5!1s0x396c4af4fe68f403:0x3bf05f95df22b8c4!8m2!3d26.8366033!4d75.6503042!16s%2Fm%2F0cp46q7?hl=en&entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black rounded-xl text-sm font-black transition-all hover:bg-spardha-gold"
                        >
                            <FaExternalLinkAlt size={12} />
                            OPEN GOOGLE MAPS
                        </a>

                        <button
                            onClick={() => setViewMode(prev => prev === 'normal' ? 'satellite' : 'normal')}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 text-xs transition-all border border-white/10 tracking-widest uppercase font-bold"
                        >
                            <FaLayerGroup size={12} />
                            {viewMode === 'normal' ? 'SATELLITE' : 'STREET'} VIEW
                        </button>
                    </div>
                </div>

                {/* Map Container */}
                <div className="flex-1 relative bg-zinc-900 overflow-hidden">
                    <MapContainer
                        center={JKLU_COORDS}
                        zoom={CAMPUS_ZOOM}
                        style={{ height: '100%', width: '100%', cursor: 'crosshair' }}
                        zoomControl={false}
                        attributionControl={false}
                    >
                        <TileLayer
                            url={viewMode === 'normal' ? normalLayer : satelliteLayer}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />

                        <MapUpdater userLocation={userLocation} />

                        {/* Route Line */}
                        {userLocation && (
                            <Polyline 
                                positions={[userLocation, JKLU_COORDS]} 
                                color="#EAB308" 
                                weight={3} 
                                dashArray="10, 10" 
                                opacity={0.6}
                                lineCap="round"
                            />
                        )}

                        <Marker position={JKLU_COORDS}>
                            <Popup minWidth={220}>
                                <div className="p-2">
                                    <h3 className="font-bold text-black border-b border-gray-100 pb-1 mb-1">JK Lakshmipat University</h3>
                                    <p className="text-xs text-gray-600">Mahapura, Jaipur, RJ</p>
                                    <p className="text-[10px] mt-2 bg-spardha-gold text-black px-2 py-0.5 rounded font-black inline-block uppercase">SPARDHA &apos;26 ARENA</p>
                                </div>
                            </Popup>
                        </Marker>

                        {userLocation && (
                            <Marker position={userLocation}>
                                <Popup>Your Location</Popup>
                            </Marker>
                        )}

                        <ZoomControl position="bottomright" />
                    </MapContainer>

                    {/* Desktop Information Panel */}
                    <div className="absolute top-4 left-4 z-[100] flex flex-col gap-2">
                        <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-white/90 uppercase tracking-widest border border-white/10 shadow-2xl">
                            JKLU Arena &bull; Circular Building
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
