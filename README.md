Todo 앱 만들기 프로젝트 <br>

Spring boot와 연동<br>

React: react-todo-app<br>
Spring boot: bookapi

CORS설정 힌트
Copy@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}

보완할 점
        새로고침 시 목록 출력
        CROS 설정
