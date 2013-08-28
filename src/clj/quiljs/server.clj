(ns quiljs.server
  (:require [compojure.core :as cc]
            [compojure.handler :as ch]
            [compojure.route :as cr]
            [hiccup.core :as h]))

(defn example-page
  [canvas-id]
  (h/html
   [:body
    [:h1 canvas-id]
    [:canvas {:id canvas-id}]
    [:script {:src "/js/processing-1.4.1.js"}]
    [:script {:src "/js/cljs.js"}]]))

(defn example-list []
  (h/html
   [:body
    [:ul
     [:li [:a {:href "example/example2"} "example2"]]
     [:li [:a {:href "example/mouse-example"} "mouse-example"]]
     [:li [:a {:href "example/key-listener"} "key-listener"]]
     (for [x (range 1 32)]
       [:li [:a {:href (str "example/gen-art-" x)} (str "gen-art-" x)]])]]))

(cc/defroutes app-routes
  (cc/GET "/" [] (example-list))
  (cc/GET "/example/:id" [id] (example-page id))
  (cr/resources "/"))

(def app
  (ch/site app-routes))

