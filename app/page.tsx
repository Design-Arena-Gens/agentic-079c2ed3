'use client';

import { useState, useEffect } from 'react';
import { Train, Clock, MapPin, Calendar, AlertCircle, Settings, Plus, Edit2, Trash2, Users, Gauge } from 'lucide-react';

interface TrainData {
  id: string;
  number: string;
  name: string;
  status: 'on-time' | 'delayed' | 'departed' | 'cancelled';
  departure: string;
  arrival: string;
  from: string;
  to: string;
  platform: string;
  delay?: number;
  capacity: number;
  occupied: number;
  speed?: number;
}

export default function Home() {
  const [trains, setTrains] = useState<TrainData[]>([
    {
      id: '1',
      number: 'TR-101',
      name: 'Express Alpha',
      status: 'on-time',
      departure: '08:30',
      arrival: '14:45',
      from: 'New York',
      to: 'Boston',
      platform: '3A',
      capacity: 400,
      occupied: 342,
      speed: 120
    },
    {
      id: '2',
      number: 'TR-205',
      name: 'Coastal Runner',
      status: 'delayed',
      departure: '09:15',
      arrival: '16:30',
      from: 'Los Angeles',
      to: 'San Francisco',
      platform: '1B',
      delay: 25,
      capacity: 350,
      occupied: 298,
      speed: 95
    },
    {
      id: '3',
      number: 'TR-312',
      name: 'Mountain Express',
      status: 'departed',
      departure: '07:00',
      arrival: '12:20',
      from: 'Denver',
      to: 'Salt Lake City',
      platform: '2C',
      capacity: 300,
      occupied: 275,
      speed: 110
    }
  ]);

  const [selectedTrain, setSelectedTrain] = useState<TrainData | null>(null);
  const [isAddingTrain, setIsAddingTrain] = useState(false);
  const [isEditingTrain, setIsEditingTrain] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'manage'>('overview');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-500';
      case 'delayed': return 'bg-yellow-500';
      case 'departed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getOccupancyColor = (occupied: number, capacity: number) => {
    const percentage = (occupied / capacity) * 100;
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const handleDeleteTrain = (id: string) => {
    setTrains(trains.filter(t => t.id !== id));
    setSelectedTrain(null);
  };

  const handleAddTrain = (trainData: Partial<TrainData>) => {
    const newTrain: TrainData = {
      id: Date.now().toString(),
      number: trainData.number || '',
      name: trainData.name || '',
      status: trainData.status || 'on-time',
      departure: trainData.departure || '',
      arrival: trainData.arrival || '',
      from: trainData.from || '',
      to: trainData.to || '',
      platform: trainData.platform || '',
      capacity: trainData.capacity || 300,
      occupied: trainData.occupied || 0,
      speed: trainData.speed || 0,
      delay: trainData.delay || 0
    };
    setTrains([...trains, newTrain]);
    setIsAddingTrain(false);
  };

  const handleEditTrain = (trainData: TrainData) => {
    setTrains(trains.map(t => t.id === trainData.id ? trainData : t));
    setSelectedTrain(trainData);
    setIsEditingTrain(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Train className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">Train Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm">
                {currentTime.toLocaleTimeString()}
              </div>
              <Settings className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex space-x-2 bg-black/30 backdrop-blur-md rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md transition ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2 px-4 rounded-md transition ${
              activeTab === 'schedule'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            Schedule
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex-1 py-2 px-4 rounded-md transition ${
              activeTab === 'manage'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            Manage
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Trains</p>
                  <p className="text-3xl font-bold text-white">{trains.length}</p>
                </div>
                <Train className="w-12 h-12 text-blue-400" />
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">On Time</p>
                  <p className="text-3xl font-bold text-green-400">
                    {trains.filter(t => t.status === 'on-time').length}
                  </p>
                </div>
                <Clock className="w-12 h-12 text-green-400" />
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Delayed</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {trains.filter(t => t.status === 'delayed').length}
                  </p>
                </div>
                <AlertCircle className="w-12 h-12 text-yellow-400" />
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Departed</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {trains.filter(t => t.status === 'departed').length}
                  </p>
                </div>
                <MapPin className="w-12 h-12 text-blue-400" />
              </div>
            </div>
          </div>
        )}

        {/* Train List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {activeTab === 'schedule' ? 'Train Schedule' : 'Active Trains'}
              </h2>
              {activeTab === 'manage' && (
                <button
                  onClick={() => setIsAddingTrain(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Train</span>
                </button>
              )}
            </div>
            {trains.map((train) => (
              <div
                key={train.id}
                onClick={() => setSelectedTrain(train)}
                className={`bg-black/30 backdrop-blur-md rounded-lg p-6 border cursor-pointer transition hover:border-blue-500 ${
                  selectedTrain?.id === train.id ? 'border-blue-500' : 'border-white/10'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-white">{train.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getStatusColor(train.status)}`}>
                        {train.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">Train {train.number}</p>
                  </div>
                  {train.delay && train.delay > 0 && (
                    <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>+{train.delay}min</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{train.from} → {train.to}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{train.departure} - {train.arrival}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-400">
                    Platform: <span className="text-white font-semibold">{train.platform}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${getOccupancyColor(train.occupied, train.capacity)}`}>
                    <Users className="w-4 h-4" />
                    <span>{train.occupied}/{train.capacity}</span>
                  </div>
                  {train.speed && (
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Gauge className="w-4 h-4" />
                      <span>{train.speed} km/h</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Train Details Panel */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10 sticky top-6">
              {selectedTrain ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Train Details</h3>
                    {activeTab === 'manage' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setIsEditingTrain(true)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition"
                        >
                          <Edit2 className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleDeleteTrain(selectedTrain.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded transition"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Train Number</p>
                      <p className="text-white font-semibold">{selectedTrain.number}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Train Name</p>
                      <p className="text-white font-semibold">{selectedTrain.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Route</p>
                      <p className="text-white font-semibold">{selectedTrain.from} → {selectedTrain.to}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Departure</p>
                        <p className="text-white font-semibold">{selectedTrain.departure}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Arrival</p>
                        <p className="text-white font-semibold">{selectedTrain.arrival}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Platform</p>
                      <p className="text-white font-semibold">{selectedTrain.platform}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status</p>
                      <span className={`inline-block px-3 py-1 rounded text-sm font-semibold text-white ${getStatusColor(selectedTrain.status)}`}>
                        {selectedTrain.status.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Occupancy</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${(selectedTrain.occupied / selectedTrain.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-white text-sm mt-1">
                        {selectedTrain.occupied} / {selectedTrain.capacity} passengers
                        ({Math.round((selectedTrain.occupied / selectedTrain.capacity) * 100)}%)
                      </p>
                    </div>
                    {selectedTrain.speed && (
                      <div>
                        <p className="text-gray-400 text-sm">Current Speed</p>
                        <p className="text-white font-semibold">{selectedTrain.speed} km/h</p>
                      </div>
                    )}
                    {selectedTrain.delay && selectedTrain.delay > 0 && (
                      <div>
                        <p className="text-gray-400 text-sm">Delay</p>
                        <p className="text-yellow-400 font-semibold">+{selectedTrain.delay} minutes</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-400 py-12">
                  <Train className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a train to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Train Modal */}
        {(isAddingTrain || isEditingTrain) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">
                {isAddingTrain ? 'Add New Train' : 'Edit Train'}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const trainData: any = {
                    number: formData.get('number'),
                    name: formData.get('name'),
                    from: formData.get('from'),
                    to: formData.get('to'),
                    departure: formData.get('departure'),
                    arrival: formData.get('arrival'),
                    platform: formData.get('platform'),
                    status: formData.get('status'),
                    capacity: Number(formData.get('capacity')),
                    occupied: Number(formData.get('occupied')),
                    speed: Number(formData.get('speed')),
                    delay: Number(formData.get('delay'))
                  };
                  if (isEditingTrain && selectedTrain) {
                    handleEditTrain({ ...trainData, id: selectedTrain.id });
                  } else {
                    handleAddTrain(trainData);
                  }
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="number"
                  defaultValue={isEditingTrain ? selectedTrain?.number : ''}
                  placeholder="Train Number"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                  required
                />
                <input
                  type="text"
                  name="name"
                  defaultValue={isEditingTrain ? selectedTrain?.name : ''}
                  placeholder="Train Name"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="from"
                    defaultValue={isEditingTrain ? selectedTrain?.from : ''}
                    placeholder="From"
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="to"
                    defaultValue={isEditingTrain ? selectedTrain?.to : ''}
                    placeholder="To"
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    name="departure"
                    defaultValue={isEditingTrain ? selectedTrain?.departure : ''}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                    required
                  />
                  <input
                    type="time"
                    name="arrival"
                    defaultValue={isEditingTrain ? selectedTrain?.arrival : ''}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="platform"
                  defaultValue={isEditingTrain ? selectedTrain?.platform : ''}
                  placeholder="Platform"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                  required
                />
                <select
                  name="status"
                  defaultValue={isEditingTrain ? selectedTrain?.status : 'on-time'}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                  required
                >
                  <option value="on-time">On Time</option>
                  <option value="delayed">Delayed</option>
                  <option value="departed">Departed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="capacity"
                    defaultValue={isEditingTrain ? selectedTrain?.capacity : 300}
                    placeholder="Capacity"
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                    required
                  />
                  <input
                    type="number"
                    name="occupied"
                    defaultValue={isEditingTrain ? selectedTrain?.occupied : 0}
                    placeholder="Occupied"
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="speed"
                    defaultValue={isEditingTrain ? selectedTrain?.speed : 0}
                    placeholder="Speed (km/h)"
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    name="delay"
                    defaultValue={isEditingTrain ? selectedTrain?.delay : 0}
                    placeholder="Delay (min)"
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                  >
                    {isAddingTrain ? 'Add Train' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingTrain(false);
                      setIsEditingTrain(false);
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
