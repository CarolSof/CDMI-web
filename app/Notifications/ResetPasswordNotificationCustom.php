<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotificationCustom extends Notification
{
    public $token;
    public $correo;

    public function __construct($token, $correo)
    {
        $this->token = $token;
        $this->correo = $correo;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        // ✅ AQUÍ ES DONDE USAS config('app.url')
        $url = config('app.url') . '/reset-password?token=' . $this->token . '&correo=' . urlencode($this->correo);

        return (new MailMessage)
            ->subject('Restablecer contraseña')
            ->line('Recibiste este email porque solicitaste restablecer tu contraseña.')
            ->action('Restablecer contraseña', $url)
            ->line('Si no solicitaste esta acción, puedes ignorar este correo.');
    }
}
