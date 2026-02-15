
import React, { useState } from 'react';
import { ArrowLeft, Video, Sparkles, Play, Download, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { advisorService } from '../services/geminiService';

export const AgriVideoLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAndGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      // Check for paid API key selection requirement
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
        // Proceeding assuming selection was successful per guidelines
      }

      const url = await advisorService.generateAgriVideo(prompt, aspectRatio);
      setVideoUrl(url);
    } catch (err: any) {
      if (err.message === "API_KEY_RESET") {
        setError("Please select a valid paid API key from a project with billing enabled.");
        await (window as any).aistudio.openSelectKey();
      } else {
        setError("Video generation failed. Please try a different prompt.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 pb-40">
      <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-100 text-purple-700 font-black text-[10px] uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> Next-Gen Agri Visualization
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none serif">
              Agri-Video <br /><span className="text-purple-600 italic underline decoration-purple-200 underline-offset-8">Lab.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Generate cinematic drone shots and training videos for your farm using Veo 3.1 AI.
            </p>
          </div>

          <div className="bg-white border-4 border-slate-100 p-8 rounded-[56px] shadow-sm space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Prompt Description</label>
              <textarea 
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A lush green wheat field in Punjab during sunset, cinematic drone shot, high resolution..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[32px] p-6 outline-none focus:border-purple-600 transition-all font-bold text-slate-700 resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Aspect Ratio</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setAspectRatio('16:9')}
                  className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${aspectRatio === '16:9' ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
                >
                  16:9 Landscape
                </button>
                <button 
                  onClick={() => setAspectRatio('9:16')}
                  className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${aspectRatio === '9:16' ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
                >
                  9:16 Portrait
                </button>
              </div>
            </div>

            <button 
              onClick={checkAndGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl shadow-purple-200 transition-all flex items-center justify-center gap-3 disabled:bg-slate-200"
            >
              {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Video className="w-6 h-6" />}
              {isGenerating ? 'Generating Cinema...' : 'Generate AI Video'}
            </button>
          </div>

          <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-200 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-relaxed">
              Note: This feature requires a paid Gemini API key. Visit <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-purple-600 underline">ai.google.dev/billing</a> for more info.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className={`aspect-video w-full rounded-[80px] bg-slate-900 flex items-center justify-center relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-8 border-white ${aspectRatio === '9:16' ? 'max-w-[400px] mx-auto aspect-[9/16]' : ''}`}>
            {isGenerating ? (
              <div className="text-center space-y-6 animate-pulse">
                <div className="bg-purple-500/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto border-4 border-purple-500/30">
                  <RefreshCw className="w-12 h-12 text-purple-400 animate-spin" />
                </div>
                <div className="space-y-2 px-12">
                  <h3 className="text-white text-2xl font-black serif">Synthesizing Pixels...</h3>
                  <p className="text-slate-400 text-sm font-bold">This usually takes about 60-90 seconds. We're creating something beautiful for you.</p>
                </div>
              </div>
            ) : videoUrl ? (
              <div className="w-full h-full relative group">
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={videoUrl} download="agri_video.mp4" className="bg-white/90 backdrop-blur-md p-4 rounded-2xl flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest shadow-2xl">
                    <Download className="w-5 h-5" /> Save Video
                  </a>
                </div>
              </div>
            ) : error ? (
              <div className="text-center space-y-4 px-12">
                 <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
                 <h3 className="text-white text-xl font-black">{error}</h3>
                 <button onClick={checkAndGenerate} className="text-purple-400 font-black uppercase tracking-widest text-xs hover:text-white transition-colors">Try Again</button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto border-2 border-white/10">
                  <Play className="w-10 h-10 text-slate-700" />
                </div>
                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Your Video Preview Will Appear Here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
