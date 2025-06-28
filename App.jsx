import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Sparkles, 
  Shell, 
  Crown, 
  Compass, 
  Users, 
  Leaf, 
  Trophy, 
  Heart,
  Zap,
  Star,
  Gem,
  Waves,
  TreePine,
  Lightbulb,
  Gift,
  Target,
  Award,
  Coins
} from 'lucide-react'
import './App.css'

// Enhanced game mechanics and features
function SoulConsole({ soulSeeds, onReflectionSubmit, achievements }) {
  const [reflection, setReflection] = useState('')

  const handleSubmit = () => {
    if (reflection.trim()) {
      onReflectionSubmit(reflection)
      setReflection('')
    }
  }

  return (
    <Card className="bg-stone-800 border-stone-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Soul Console
          {achievements.reflectionMaster && (
            <Badge className="bg-purple-600 text-xs">
              <Award className="w-3 h-3 mr-1" />
              Reflection Master
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="bg-stone-900 border-stone-600 text-white placeholder-stone-400" 
          rows={4} 
          placeholder="Write your reflection on your builds and duels..."
        />
        <div className="flex justify-between items-center">
          <Button 
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 hover:scale-105"
            disabled={!reflection.trim()}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Submit (+10 Seeds)
          </Button>
          <Badge variant="secondary" className="bg-yellow-600 animate-pulse">
            <Star className="w-4 h-4 mr-1" />
            {soulSeeds} Soul Seeds
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function MirrorEngine({ lastReflection, achievements }) {
  const echoes = [
    "Your builds echo resilience and creativity.",
    "This proposal resonates with ancient wisdom.",
    "Your duels reflect the spirit of fair competition.",
    "The kingdom grows stronger with your contributions.",
    "Your craftsmanship illuminates the path forward.",
    "In harmony with nature, your structures thrive.",
    "The light of collaboration shines through your work.",
    "Your dedication to sustainability inspires others."
  ]

  const currentEcho = lastReflection ? 
    `"${lastReflection.substring(0, 50)}..." echoes through the realm.` :
    echoes[Math.floor(Math.random() * echoes.length)]

  return (
    <Card className="bg-stone-800 border-stone-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shell className="w-5 h-5 text-blue-400" />
          Mirror Engine
          {achievements.wisdomSeeker && (
            <Badge className="bg-blue-600 text-xs">
              <Lightbulb className="w-3 h-3 mr-1" />
              Wisdom Seeker
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm italic text-stone-300 animate-fade-in">
          {currentEcho}
        </p>
      </CardContent>
    </Card>
  )
}

function CompassMeter({ metrics, achievements }) {
  return (
    <Card className="bg-stone-800 border-stone-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Compass className="w-5 h-5 text-green-400" />
          Compass
          {achievements.balanceMaster && (
            <Badge className="bg-green-600 text-xs">
              <Target className="w-3 h-3 mr-1" />
              Balance Master
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="capitalize flex items-center gap-1">
                {key === 'sustainability' && <Leaf className="w-3 h-3" />}
                {key === 'transparency' && <Sparkles className="w-3 h-3" />}
                {key === 'fairness' && <Heart className="w-3 h-3" />}
                {key === 'sovereignty' && <Crown className="w-3 h-3" />}
                {key}
              </span>
              <span className="font-bold">{value}%</span>
            </div>
            <Progress value={value} className="h-2 transition-all duration-500" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ProposalBoard({ proposals, onVote, achievements }) {
  return (
    <Card className="bg-stone-800 border-stone-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Crown className="w-5 h-5 text-purple-400" />
          Proposals
          {achievements.communityLeader && (
            <Badge className="bg-purple-600 text-xs">
              <Users className="w-3 h-3 mr-1" />
              Community Leader
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-stone-900 p-3 rounded-lg hover:bg-stone-700 transition-colors duration-200">
            <p className="font-semibold text-sm mb-1">#{proposal.id.toString().padStart(3, '0')} "{proposal.title}"</p>
            <p className="text-xs text-stone-400 mb-2 flex items-center gap-1">
              <Compass className="w-3 h-3" />
              Compass: {proposal.focus}
            </p>
            <div className="flex justify-between items-center">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-emerald-400 border-emerald-400 hover:bg-emerald-400 hover:text-black transition-all duration-200"
                onClick={() => onVote(proposal.id)}
              >
                <Trophy className="w-3 h-3 mr-1" />
                Vote
              </Button>
              <Badge variant="secondary" className="text-xs">
                {proposal.votes || Math.floor(Math.random() * 50) + 10} votes
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SignalBloomMap({ kingdomProgress, mode, gameStats }) {
  return (
    <Card className="bg-stone-800 border-stone-700 text-white h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TreePine className="w-5 h-5 text-pink-400" />
          Signal Bloom
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-pink-400 mb-2 animate-pulse">{kingdomProgress}%</div>
          <p className="text-sm text-stone-300">
            {mode === 'pvp' ? 'Shellshock Kingdom' : 'Pearhaven Kingdom'} Progress
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-stone-900 p-2 rounded text-center hover:bg-stone-700 transition-colors">
            <Shell className="w-4 h-4 mx-auto mb-1 text-blue-400" />
            <div>Shells</div>
            <div className="font-bold">{gameStats.shells}</div>
          </div>
          <div className="bg-stone-900 p-2 rounded text-center hover:bg-stone-700 transition-colors">
            <Gem className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
            <div>Pearls</div>
            <div className="font-bold">{gameStats.pearls}</div>
          </div>
          <div className="bg-stone-900 p-2 rounded text-center hover:bg-stone-700 transition-colors">
            <Crown className="w-4 h-4 mx-auto mb-1 text-purple-400" />
            <div>Structures</div>
            <div className="font-bold">{gameStats.structures}</div>
          </div>
        </div>
        <div className="text-center">
          <Badge className="bg-pink-600">
            <Gift className="w-3 h-3 mr-1" />
            Daily Bonus Available
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function LoreCard({ loreThreads, achievements }) {
  const [currentLore, setCurrentLore] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLore((prev) => (prev + 1) % loreThreads.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [loreThreads.length])

  return (
    <Card className="bg-stone-800 border-stone-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-orange-400" />
          Lore Thread
          {achievements.loreKeeper && (
            <Badge className="bg-orange-600 text-xs">
              <Lightbulb className="w-3 h-3 mr-1" />
              Lore Keeper
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="italic text-sm text-stone-300 transition-opacity duration-1000">
          {loreThreads[currentLore]}
        </blockquote>
        <div className="flex justify-center mt-3 space-x-1">
          {loreThreads.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentLore ? 'bg-orange-400' : 'bg-stone-600'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AvatarCard({ player, achievements }) {
  return (
    <Card className="bg-stone-800 border-stone-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="w-5 h-5 text-blue-400" />
          Your Avatar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span>Role:</span>
          <Badge variant="secondary" className="animate-pulse">{player.role}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span>Soul Seeds:</span>
          <Badge className="bg-yellow-600">
            <Star className="w-3 h-3 mr-1" />
            {player.soulSeeds}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span>Level:</span>
          <Badge variant="outline">{player.level}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span>Wins:</span>
          <Badge className="bg-green-600">
            <Trophy className="w-3 h-3 mr-1" />
            {player.wins}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span>Achievements:</span>
          <Badge className="bg-purple-600">
            <Award className="w-3 h-3 mr-1" />
            {Object.values(achievements).filter(Boolean).length}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function RitualOverlay({ activeRituals, nextRitual, onClaimDailyBonus, dailyBonusClaimed }) {
  return (
    <Card className="bg-stone-800 border-stone-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Waves className="w-5 h-5 text-teal-400" />
          Ritual Overlay
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {!dailyBonusClaimed && (
          <Button 
            onClick={onClaimDailyBonus}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            <Gift className="w-4 h-4 mr-2" />
            Claim Daily Bonus (+50 Seeds)
          </Button>
        )}
        {activeRituals.length > 0 ? (
          <div className="space-y-2">
            {activeRituals.map((ritual, index) => (
              <div key={index} className="bg-stone-900 p-2 rounded">
                <p className="text-sm font-semibold">{ritual.name}</p>
                <p className="text-xs text-stone-400">{ritual.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-400">
            No active rituals. Next rite begins: {nextRitual}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function GameModeSelector({ mode, onModeChange }) {
  return (
    <Tabs value={mode} onValueChange={onModeChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-stone-800">
        <TabsTrigger value="pvp" className="data-[state=active]:bg-red-600 transition-all duration-300">
          <Zap className="w-4 h-4 mr-2" />
          Shellshock Forge (PvP)
        </TabsTrigger>
        <TabsTrigger value="pve" className="data-[state=active]:bg-blue-600 transition-all duration-300">
          <Heart className="w-4 h-4 mr-2" />
          Pearhaven Quest (PvE)
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

function CraftingInterface({ mode, onCraft, isAnimating, craftCount }) {
  return (
    <Card className="bg-gradient-to-br from-stone-800 to-stone-900 border-stone-700 text-white">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          {mode === 'pvp' ? '⚔️ Light Clash Arena' : '🏗️ Peaceful Crafting'}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="relative">
          <Button
            size="lg"
            onClick={onCraft}
            className={`w-32 h-32 rounded-full text-6xl transition-all duration-300 ${
              isAnimating 
                ? 'scale-110 bg-yellow-400 text-black animate-pulse' 
                : mode === 'pvp' 
                  ? 'bg-red-600 hover:bg-red-700 hover:scale-105' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            }`}
          >
            🐚
          </Button>
          {isAnimating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border-4 border-yellow-400 rounded-full animate-ping"></div>
            </div>
          )}
        </div>
        <p className="text-sm text-stone-300">
          {mode === 'pvp' 
            ? 'Tap to crack shells and outshine your rivals!' 
            : 'Tap to craft blocks and build your peaceful haven!'
          }
        </p>
        <Badge className="bg-stone-700">
          <Coins className="w-3 h-3 mr-1" />
          Crafted: {craftCount}
        </Badge>
      </CardContent>
    </Card>
  )
}

function App() {
  const [gameMode, setGameMode] = useState('pvp')
  const [player, setPlayer] = useState({
    role: 'Whisperer',
    soulSeeds: 27,
    level: 5,
    wins: 12
  })
  
  const [metrics, setMetrics] = useState({
    sustainability: 61,
    transparency: 48,
    fairness: 74,
    sovereignty: 32
  })

  const [gameStats, setGameStats] = useState({
    shells: 247,
    pearls: 89,
    structures: 12
  })

  const [kingdomProgress, setKingdomProgress] = useState(45)
  const [lastReflection, setLastReflection] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [craftCount, setCraftCount] = useState(0)
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(false)
  
  const [achievements, setAchievements] = useState({
    reflectionMaster: false,
    wisdomSeeker: false,
    balanceMaster: false,
    communityLeader: false,
    loreKeeper: false
  })
  
  const [proposals] = useState([
    { id: 12, title: "Bloom the Forest Grid", focus: "Sustainability", votes: 42 },
    { id: 13, title: "Pearl Harbor Sanctuary", focus: "Transparency", votes: 38 },
    { id: 14, title: "Golden Shell Exchange", focus: "Fairness", votes: 51 }
  ])

  const [loreThreads] = useState([
    "In the cycle of silence, echoes guide the brave.",
    "Where shells crack, pearls of wisdom emerge.",
    "The kingdom grows not by conquest, but by craft.",
    "In unity of purpose, the light shines brightest.",
    "Every reflection births a new possibility.",
    "The ocean's wisdom flows through patient hands.",
    "Sustainable paths lead to eternal kingdoms."
  ])

  const [activeRituals] = useState([])
  const nextRitual = "Friday 9 PM UTC"

  // Check for achievements
  useEffect(() => {
    const newAchievements = { ...achievements }
    
    if (player.soulSeeds >= 100 && !achievements.reflectionMaster) {
      newAchievements.reflectionMaster = true
    }
    if (craftCount >= 50 && !achievements.wisdomSeeker) {
      newAchievements.wisdomSeeker = true
    }
    if (Object.values(metrics).every(v => v >= 50) && !achievements.balanceMaster) {
      newAchievements.balanceMaster = true
    }
    if (player.wins >= 20 && !achievements.communityLeader) {
      newAchievements.communityLeader = true
    }
    if (lastReflection && !achievements.loreKeeper) {
      newAchievements.loreKeeper = true
    }
    
    setAchievements(newAchievements)
  }, [player, craftCount, metrics, lastReflection, achievements])

  const handleReflectionSubmit = (reflection) => {
    setLastReflection(reflection)
    setPlayer(prev => ({ ...prev, soulSeeds: prev.soulSeeds + 10 }))
  }

  const handleVote = (proposalId) => {
    console.log(`Voted on proposal ${proposalId}`)
    setPlayer(prev => ({ ...prev, soulSeeds: prev.soulSeeds + 5 }))
    
    // Slightly improve metrics based on proposal focus
    const proposal = proposals.find(p => p.id === proposalId)
    if (proposal) {
      setMetrics(prev => ({
        ...prev,
        [proposal.focus.toLowerCase()]: Math.min(prev[proposal.focus.toLowerCase()] + 2, 100)
      }))
    }
  }

  const handleCraft = () => {
    setIsAnimating(true)
    setCraftCount(prev => prev + 1)
    
    setPlayer(prev => ({ 
      ...prev, 
      soulSeeds: prev.soulSeeds + 2,
      wins: gameMode === 'pvp' ? prev.wins + 1 : prev.wins
    }))
    
    setGameStats(prev => ({
      ...prev,
      shells: prev.shells + 1,
      pearls: prev.pearls + (Math.random() > 0.7 ? 1 : 0),
      structures: prev.structures + (Math.random() > 0.9 ? 1 : 0)
    }))
    
    setKingdomProgress(prev => Math.min(prev + 2, 100))
    
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const handleClaimDailyBonus = () => {
    setPlayer(prev => ({ ...prev, soulSeeds: prev.soulSeeds + 50 }))
    setDailyBonusClaimed(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-stone-900 to-slate-900 text-white p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          🕯️ Goldhaven — <span className="italic">Cycle of Resonance</span>
        </h1>
        <p className="text-stone-300 mb-4 text-lg">Clash, Craft, Light Up the World!</p>
        <GameModeSelector mode={gameMode} onModeChange={setGameMode} />
      </header>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Crafting Interface */}
        <div className="flex justify-center">
          <CraftingInterface 
            mode={gameMode} 
            onCraft={handleCraft} 
            isAnimating={isAnimating}
            craftCount={craftCount}
          />
        </div>

        {/* First Row - Core Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SoulConsole 
            soulSeeds={player.soulSeeds} 
            onReflectionSubmit={handleReflectionSubmit}
            achievements={achievements}
          />
          <MirrorEngine 
            lastReflection={lastReflection}
            achievements={achievements}
          />
          <CompassMeter 
            metrics={metrics}
            achievements={achievements}
          />
        </div>

        {/* Second Row - Community & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ProposalBoard 
            proposals={proposals} 
            onVote={handleVote}
            achievements={achievements}
          />
          <SignalBloomMap 
            kingdomProgress={kingdomProgress} 
            mode={gameMode}
            gameStats={gameStats}
          />
          <LoreCard 
            loreThreads={loreThreads}
            achievements={achievements}
          />
        </div>

        {/* Third Row - Player Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AvatarCard 
            player={player}
            achievements={achievements}
          />
          <RitualOverlay 
            activeRituals={activeRituals} 
            nextRitual={nextRitual}
            onClaimDailyBonus={handleClaimDailyBonus}
            dailyBonusClaimed={dailyBonusClaimed}
          />
        </div>
      </div>
    </div>
  )
}

export default App

