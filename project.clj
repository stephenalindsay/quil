(defproject quil.js "0.1.0"
  :description "Port of Quil to ClojureScript"
  :url "http://github.com/stephenalindsay/quil.js"
  :license {:name "Common Public License - v 1.0"
            :url "http://www.opensource.org/licenses/cpl1.0"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [compojure "1.1.5"]
                 [hiccup "1.0.4"]]
  :plugins [[lein-cljsbuild "0.3.2"]
            [lein-ring "0.8.5"]]
  :hooks [leiningen.cljsbuild]
  :source-paths ["src/clj"]
  :cljsbuild {
    :builds {
      :main {
        :source-paths ["src/cljs" "src/clj"]
        :compiler {:output-to "resources/public/js/cljs.js"
                   :optimizations :simple
                   :pretty-print true}
        :jar true}}}
  :main quiljs.server
  :ring {:handler quiljs.server/app})
