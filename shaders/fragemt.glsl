uniform sampler2D globeTexture;

varying vec2 vertexUV; // vec2(0, 0.24);
varying vec3 vertexNormal;


void main(){
        float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
        vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow (intensity, 1.5);

        gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);

    //texture2D(globeTexture, vertexUV);

    //fragcolor needs a vec4, tetxure2d is a vec3 so we can do other stuff like adding a tint
   // gl_FragColor =  vec4(vec3(0,0, 0.1) + texture2D(globeTexture, vertexUV).xyz, 1.0);  globeTextureis the texture the vertexUV is the cordinate of the uv to give
}