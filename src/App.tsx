import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import {Helmet, HelmetProvider} from "react-helmet-async"
import {Toaster} from "sonner"
import { ThemeProvider } from "./components/theme/theme-provider"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryCliente } from "./lib/react-query"


function App() {

  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Pizza Shop"/>
        <Toaster richColors/>

        <QueryClientProvider client={queryCliente}>
          <RouterProvider router={router}/>
        </QueryClientProvider>

      </ThemeProvider>

    </HelmetProvider>
  )
}

export default App
