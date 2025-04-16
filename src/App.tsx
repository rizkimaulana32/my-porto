import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";

function App() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const fullText = "Mohammad Rizki Maulana";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    let index = 0;
    let isErasing = false;
    let pauseCount = 0;

    const typeInterval = setInterval(() => {
      if (isLoading) return;

      if (!isErasing && index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        index++;
      } else if (!isErasing && index >= fullText.length) {
        if (pauseCount < 20) {
          pauseCount++;
        } else {
          isErasing = true;
          pauseCount = 0;
        }
      } else if (isErasing && index > 0) {
        index--;
        setText(fullText.substring(0, index));
      } else if (isErasing && index === 0) {
        if (pauseCount < 10) {
          pauseCount++;
        } else {
          isErasing = false;
          pauseCount = 0;
        }
      }
    }, 100);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(typeInterval);
    };
  }, [fullText, isLoading]);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="w-80 text-center">
        <CardHeader>
          {isLoading ? (
            <>
              <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-40 mx-auto" />
            </>
          ) : (
            <>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar
                        className="w-full h-full cursor-pointer transform transition-transform hover:scale-105"
                        onClick={toggleTheme}
                      >
                        <AvatarImage src="/02.png" />
                        <AvatarFallback>MRM</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click me to toggle theme!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="absolute bottom-0 right-0 bg-background rounded-full p-1 shadow-md">
                  {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                </div>
              </div>
              <CardTitle className="text-xl font-semibold h-6">
                {text}
                <span className="animate-pulse">|</span>
              </CardTitle>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-full mx-auto mb-2" />
              <Skeleton className="h-6 w-full mx-auto mb-2" />
              <Skeleton className="h-6 w-full mx-auto" />
            </>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-2">
                <Github className="text-foreground" />
                <a
                  href="https://github.com/rizkimaulana32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  rizkimaulana32
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="text-foreground" />
                <a
                  href="mailto:mohrizkimaul@gamil.com"
                  className="text-primary hover:underline"
                >
                  mohrizkimaul@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Linkedin className="text-foreground" />
                <a
                  href="https://linkedin.com/in/mohrizkimaul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mohrizkimaul
                </a>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
