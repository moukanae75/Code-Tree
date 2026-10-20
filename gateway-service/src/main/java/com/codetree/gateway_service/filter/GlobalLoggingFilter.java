package com.codetree.gateway_service.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;

@Component
public class GlobalLoggingFilter implements GlobalFilter, Ordered {

    // ANSI Color Escape Codes for Terminal
    private static final String RESET = "\u001B[0m";
    private static final String BOLD = "\u001B[1m";
    private static final String RED = "\u001B[31m";
    private static final String GREEN = "\u001B[32m";
    private static final String YELLOW = "\u001B[33m";
    private static final String BLUE = "\u001B[34m";
    private static final String PURPLE = "\u001B[35m";
    private static final String CYAN = "\u001B[36m";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        long startTime = System.currentTimeMillis();
        String path = exchange.getRequest().getURI().getPath();
        String method = exchange.getRequest().getMethod().name();

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            long duration = System.currentTimeMillis() - startTime;
            Route route = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
            String routeId = (route != null) ? route.getId() : "UNKNOWN";
            URI routeUri = (route != null) ? route.getUri() : null;

            HttpStatusCode status = exchange.getResponse().getStatusCode();
            int statusCode = (status != null) ? status.value() : 0;

            String serviceColor = getColorForRoute(routeId);
            String statusColor = (statusCode >= 200 && statusCode < 400) ? GREEN : RED;
            String icon = getServiceIcon(routeId);

            System.out.println(String.format(
                "\n%s================================================================================%s\n" +
                " %s[%s]%s %s %s\n" +
                " %s==> Target Service:%s %s%s (%s)%s\n" +
                " %s==> Status Code:%s %s%d %s%s | %sDuration:%s %d ms\n" +
                "%s================================================================================%s",
                serviceColor, RESET,
                BOLD, method, RESET, path, icon,
                BOLD, RESET, serviceColor, routeId, routeUri, RESET,
                BOLD, RESET, statusColor, statusCode, (status != null ? status : ""), RESET, BOLD, RESET, duration,
                serviceColor, RESET
            ));
        }));
    }

    private String getColorForRoute(String routeId) {
        String lower = routeId.toLowerCase();
        if (lower.contains("identity")) return YELLOW;       // 🟡 Yellow for Identity
        if (lower.contains("content")) return CYAN;          // 🔵 Cyan for Content
        if (lower.contains("gamification")) return PURPLE;   // 🟣 Purple for Gamification
        if (lower.contains("engine")) return GREEN;          // 🟢 Green for Code Engine
        return BLUE;
    }

    private String getServiceIcon(String routeId) {
        String lower = routeId.toLowerCase();
        if (lower.contains("identity")) return "🔐 [IDENTITY-SERVICE]";
        if (lower.contains("content")) return "📚 [CONTENT-SERVICE]";
        if (lower.contains("gamification")) return "🎮 [GAMIFICATION-SERVICE]";
        if (lower.contains("engine")) return "⚡ [CODE-ENGINE]";
        return "🚪 [API-GATEWAY]";
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }
}
