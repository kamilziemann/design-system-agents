"use client";
import { RefactorAgent } from "@/components/refactor-agent";
import { ComponentConverter } from "@/components/component-converter";
import { ComponentAgent } from "@/components/component-agent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const HomePage = () => (
	<div className="min-h-screen bg-gray-50">
		<div className="container mx-auto px-4 py-8">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">AI Design System Agents</h1>
				<p className="text-lg text-gray-600">
					Refactor, convert, and generate components across React, Kotlin, and Swift
				</p>
			</div>

			<Tabs
				defaultValue="refactor"
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-4 mb-8">
					<TabsTrigger value="refactor">Refactor Agent</TabsTrigger>
					<TabsTrigger value="converter">Component Converter</TabsTrigger>
					<TabsTrigger value="generator">Component Agent</TabsTrigger>
				</TabsList>

				<TabsContent value="refactor">
					<RefactorAgent />
				</TabsContent>

				<TabsContent value="converter">
					<ComponentConverter />
				</TabsContent>

				<TabsContent value="generator">
					<ComponentAgent />
				</TabsContent>
			</Tabs>
		</div>
	</div>
);

