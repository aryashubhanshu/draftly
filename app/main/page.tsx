"use client"

import { useState } from "react"
import { Loader2, Copy, Check, Sparkles, FileText, PencilLine } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { generateDrafts } from "../actions/generate"

export default function Main() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<{
    summary: string;
    linkedin: string;
    twitter: string;
  } | null>(null)

  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const handleGenerate = async () => {
    if (!url) return
    setIsLoading(true)
    
    const response = await generateDrafts(url);
    if(response.success && response.data){
      setData(response.data);
    } else {
      alert(response.error || "Something went wrong");
    }
    setIsLoading(false);
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStates(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }))
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-16 px-4 sm:px-8 lg:px-16 text-neutral-900 font-sans selection:bg-blue-100">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-50 text-blue-600 mb-2">
            <PencilLine className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black tracking-tight text-neutral-900">
            Generate Event Drafts
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Transform any event URL into a crisp summary, an engaging LinkedIn post, and a viral Twitter thread in seconds.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white/60 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 relative overflow-hidden transition-all">
          <div className="relative flex flex-col sm:flex-row items-end gap-5">
            <div className="flex-1 w-full">
              <Field>
                <FieldLabel htmlFor="input-group-url" className="text-sm font-semibold text-neutral-700 mb-2 inline-block uppercase tracking-wider">
                  Event URL
                </FieldLabel>
                <InputGroup className="h-14">
                  <InputGroupInput 
                    id="input-group-url" 
                    placeholder="https://example.com/event" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-14 text-lg px-4"
                  />
                </InputGroup>
              </Field>
            </div>
            <Button 
              className="h-14 px-8 w-full sm:w-auto text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all rounded-xl bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={handleGenerate}
              disabled={!url || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? "Analyzing Event..." : "Generate Drafts"}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            
            {/* Left Column: Summary */}
            <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Event Summary</h3>
                  <p className="text-sm text-neutral-500">Quick breakdown of what happened</p>
                </div>
              </div>
              <p className="text-neutral-600 leading-relaxed text-lg">
                {data.summary}
              </p>
            </div>

            {/* LinkedIn Post Component */}
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 flex flex-col overflow-hidden group hover:border-[#0A66C2]/30 transition-colors duration-300">
              <div className="px-8 py-6 border-b border-neutral-50 flex items-center justify-between bg-gradient-to-r from-[#0A66C2]/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-neutral-900 text-lg">LinkedIn</h3>
                </div>
                <Button 
                  onClick={() => handleCopy(data.linkedin, 'linkedin')}
                  variant="outline" 
                  size="sm"
                  className="rounded-full px-4 border-neutral-200 hover:bg-[#0A66C2]/5 hover:text-[#0A66C2] hover:border-[#0A66C2]/20 transition-all font-medium py-1.5 h-auto text-sm"
                >
                  {copiedStates['linkedin'] ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copiedStates['linkedin'] ? 'Copied!' : 'Copy Post'}
                </Button>
              </div>
              <div className="p-8 flex-grow">
                <p className="text-neutral-700 whitespace-pre-wrap leading-relaxed">
                  {data.linkedin}
                </p>
              </div>
            </div>

            {/* Twitter Post Component */}
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 flex flex-col overflow-hidden group hover:border-[#1DA1F2]/30 transition-colors duration-300">
              <div className="px-8 py-6 border-b border-neutral-50 flex items-center justify-between bg-gradient-to-r from-[#1DA1F2]/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-neutral-900 text-lg">Twitter</h3>
                </div>
                <Button 
                  onClick={() => handleCopy(data.twitter, 'twitter')}
                  variant="outline" 
                  size="sm"
                  className="rounded-full px-4 border-neutral-200 hover:bg-[#1DA1F2]/5 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/20 transition-all font-medium py-1.5 h-auto text-sm"
                >
                  {copiedStates['twitter'] ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copiedStates['twitter'] ? 'Copied!' : 'Copy Thread'}
                </Button>
              </div>
              <div className="p-8 flex-grow">
                <p className="text-neutral-700 whitespace-pre-wrap leading-relaxed">
                  {data.twitter}
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
