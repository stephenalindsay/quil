(ns quiljs.macros
  (:require [clojure.string :as s]))

(defmacro
  ^{:requires-bindings true
    :processing-name nil
    :category "Transform"
    :subcategory "Utility Macros"}
  with-translation
  "Performs body with translation, restores current transformation on
  exit."
  [translation-vector & body]
  `(let [tr# ~translation-vector]
     (quil.core/push-matrix)
     (quil.core/translate tr#)
     ~@body
     (quil.core/pop-matrix)))

(defmacro
  ^{:requires-bindings true
    :processing-name nil
    :category "Transform"
    :subcategory "Utility Macros"}
  with-rotation
  "Performs body with rotation, restores current transformation on exit.
  Accepts a vector [angle] or [angle x-axis y-axis z-axis].

  Example:
    (with-rotation [angle]
      (vertex 1 2))"
  [rotation & body]
  `(let [tr# ~rotation]
     (quil.core/push-matrix)
     (apply quil.core/rotate tr#)
     ~@body
     (quil.core/pop-matrix)))

(defmacro defsketch
  [id & args]
  (let [{:keys [title setup draw size renderer
                mouse-moved key-typed]} (apply hash-map args)
        [width height] size
        canvas-id (name id)]
    `(if-let [canvas# (.getElementById js/document ~canvas-id)]
       (let [state#       (atom nil)
             pjs#         (js/Processing. canvas#)
             binding-fn#  #(binding [quil.core/*pjs*   pjs#
                                     quil.core/*state* state#]
                             (%))
             draw#        (if ~draw ~draw (fn []))
             mouse-moved# (if ~mouse-moved ~mouse-moved (fn []))
             key-typed#   (if ~key-typed ~key-typed (fn []))]
         (set! (.-setup pjs#) (fn []
                                (binding [quil.core/*pjs*   pjs#
                                          quil.core/*state* state#]
                                  (case ~renderer
                                    :opengl (.size pjs# ~width ~height (.-OPENGL pjs#))
                                    :p3d    (.size pjs# ~width ~height (.-P3D pjs#))
                                    (.size pjs# ~width ~height))
                                  (~setup)
                                  (.loop pjs#))))
         (set! (.-draw pjs#) (fn []
                               (binding [quil.core/*pjs*   pjs#
                                         quil.core/*state* state#]
                                 (draw#))))
         (set! (.-keyTyped pjs#) (fn []
                                   (binding [quil.core/*pjs*   pjs#
                                             quil.core/*state* state#]
                                     (key-typed#))))
         (set! (.-mouseMoved pjs#) (fn []
                                     (binding [quil.core/*pjs*   pjs#
                                               quil.core/*state* state#]
                                       (mouse-moved#))))
         (.setup pjs#))
       (.log js/console "No canvas element with id : " ~canvas-id))))
