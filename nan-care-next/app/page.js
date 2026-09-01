'use client';

import { useState } from 'react';
import Logo from '../components/Logo';

const departments = [
  {
    title: 'Maternity & Delivery',
    desc: 'Normal and caesarean delivery suites, a dedicated labour team, and rooming-in so mother and baby are not separated after birth.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="21" stroke="#24443B" strokeWidth="1.4" />
        <path d="M22 12v20M14 18c0 6 4 10 8 10s8-4 8-10" stroke="#C89B3C" strokeWidth="1.6" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Neonatal Intensive Care (NICU)',
    desc: 'Level-II NICU for premature and low-weight newborns, staffed around the clock by neonatologists and NICU-trained nurses.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <rect x="10" y="14" width="24" height="18" rx="3" stroke="#24443B" strokeWidth="1.4" />
        <circle cx="17" cy="23" r="2.4" fill="#C97268" />
        <circle cx="27" cy="23" r="2.4" fill="#C97268" />
      </svg>
    ),
  },
  {
    title: 'Paediatrics',
    desc: "Everyday childhood illness, growth monitoring, and a paediatrician on call for anything that can't wait until morning.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="16" r="7" stroke="#24443B" strokeWidth="1.4" />
        <path d="M10 34c0-8 5.4-13 12-13s12 5 12 13" stroke="#24443B" strokeWidth="1.4" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Gynaecology',
    desc: 'Pregnancy care from the first trimester, high-risk pregnancy monitoring, and general women\u2019s health consultations.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <path d="M22 8c-9 5-13 12-13 18a13 13 0 0026 0c0-6-4-13-13-18Z" stroke="#24443B" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: 'Vaccination & Immunisation',
    desc: 'A tracked schedule from birth through age twelve, with SMS reminders so no dose gets missed.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <path d="M14 22h16M22 14v16" stroke="#24443B" strokeWidth="1.6" />
        <circle cx="22" cy="22" r="15" stroke="#C89B3C" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: 'Child Nutrition & Growth',
    desc: 'Dietician-led plans for underweight, overweight, or feeding-difficulty cases, reviewed alongside your paediatrician.',
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <path d="M12 24c0-8 4-14 10-14s10 6 10 14-4 8-10 8-10 0-10-8Z" stroke="#24443B" strokeWidth="1.4" />
      </svg>
    ),
  },
];

const doctors = [
  {
    initials: 'RS',
    color: '#24443B',
    name: 'Dr. Ritu Sharma',
    role: 'Obstetrics & Gynaecology',
    bio: 'Fifteen years delivering in Alwar, with a focus on high-risk pregnancies and VBAC support.',
  },
  {
    initials: 'AK',
    color: '#C97268',
    name: 'Dr. Anil Kapoor',
    role: 'Neonatology, NICU Lead',
    bio: 'Heads the NICU team; trained in newborn intensive care at SMS Medical College, Jaipur.',
  },
  {
    initials: 'SM',
    color: '#C89B3C',
    name: 'Dr. Sonal Mathur',
    role: 'Paediatrics',
    bio: 'Sees children from birth through adolescence, with a particular interest in growth and nutrition.',
  },
];

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [formNote, setFormNote] = useState(
    "We'll confirm your slot by phone, usually within a few hours during OPD hours."
  );

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.fname.value.trim();
    setFormNote(
      `Thank you, ${name || 'there'} — our desk will call you shortly to confirm your slot. This is a demo form; connect it to your booking system to go live.`
    );
    e.target.reset();
  }

  return (
    <>
      <div className="topstrip">
        <div className="wrap">
          <span className="emerg">
            24×7 Emergency &amp; NICU: <a href="tel:+919829000111">+91 98290 00111</a>
          </span>
          <span>Bhagat Singh Circle, Alwar, Rajasthan 301001</span>
        </div>
      </div>

      <header className="site">
        <nav className="wrap">
          <a href="#top">
            <Logo size={34} />
          </a>
          <button
            className="navtoggle"
            aria-label="Toggle menu"
            aria-expanded={navOpen}
            aria-controls="navLinks"
            onClick={() => setNavOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`navlinks${navOpen ? ' open' : ''}`} id="navLinks">
            <a href="#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="#departments" onClick={() => setNavOpen(false)}>Departments</a>
            <a href="#doctors" onClick={() => setNavOpen(false)}>Doctors</a>
            <a href="#process" onClick={() => setNavOpen(false)}>Appointments</a>
            <a href="#reviews" onClick={() => setNavOpen(false)}>Parents Say</a>
            <a href="#contact" className="navcta" onClick={() => setNavOpen(false)}>Book a Visit</a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap">
            <div>
              <div className="eyebrow-line">
                <span>Maternity &amp; Child Care, Alwar</span>
                <span className="rule" aria-hidden="true"></span>
              </div>
              <h1>
                Care built around your <em>nanha</em>, from the first cry onward.
              </h1>
              <p className="lead">
                Nan Care is a maternity and paediatric hospital where delivery, neonatal intensive
                care, and childhood care sit under one roof — so no family has to be sent
                elsewhere at the moment it matters most.
              </p>
              <div className="ctas">
                <a href="#contact" className="btn btn-primary">Book an appointment</a>
                <a href="tel:+919829000111" className="btn btn-ghost">Emergency line</a>
              </div>
            </div>
            <div className="hero-art">
              <svg
                viewBox="0 0 480 480"
                role="img"
                aria-label="Illustration of two arcs cradling a smaller arc, symbolising parent and child"
              >
                <circle cx="240" cy="240" r="200" fill="#F1EADB" />
                <path d="M100 300c0-100 62-180 140-180" stroke="#24443B" strokeWidth="10" strokeLinecap="round" fill="none" />
                <path d="M380 300c0-100-62-180-140-180" stroke="#24443B" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.35" />
                <path d="M150 330c0-66 40-118 90-118" stroke="#C89B3C" strokeWidth="10" strokeLinecap="round" fill="none" />
                <circle cx="240" cy="200" r="34" fill="#C97268" />
                <path d="M120 372c48 30 96 30 240 0" stroke="#24443B" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.5" />
              </svg>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="stats">
          <div className="wrap">
            <div className="stat"><b>18</b><span>Years serving Alwar families</span></div>
            <div className="stat"><b>32</b><span>Paediatric &amp; maternity specialists</span></div>
            <div className="stat"><b>9,400+</b><span>Babies delivered here</span></div>
            <div className="stat"><b>14</b><span>Level-II NICU beds</span></div>
          </div>
        </div>

        {/* ABOUT */}
        <section className="about" id="about">
          <div className="wrap about-grid">
            <div className="figure">
              <svg viewBox="0 0 400 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="400" height="500" fill="#24443B" />
                <circle cx="200" cy="190" r="120" fill="#3B6357" />
                <circle cx="200" cy="190" r="60" fill="#C89B3C" />
                <path d="M60 460c60-70 220-70 280 0" stroke="#F1EADB" strokeWidth="6" fill="none" opacity="0.5" />
              </svg>
            </div>
            <div className="about-copy">
              <div className="section-head" style={{ display: 'block', marginBottom: 26 }}>
                <div className="rule-label">
                  <span className="rule" aria-hidden="true"></span>
                  <span>Since 2008</span>
                </div>
                <h2>A hospital that only does one thing — mothers and children.</h2>
              </div>
              <p>
                Nan Care was started by a small group of paediatricians and obstetricians in Alwar
                who kept sending complicated newborn cases two hours away to Jaipur. They built a
                hospital where delivery, neonatal care and childhood follow-up happen in one
                building, under one file, with one team that knows the child from birth.
              </p>
              <p>
                Today that means a mother in labour, a two-day-old in the NICU, and a
                seven-year-old in for a vaccination are all seen by doctors who talk to each other
                daily — not across referral letters.
              </p>
            </div>
          </div>
        </section>

        {/* DEPARTMENTS */}
        <section id="departments">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="rule-label">
                  <span className="rule" aria-hidden="true"></span>
                  <span>What we treat</span>
                </div>
                <h2>Departments</h2>
              </div>
              <p>
                Every department below works from the same patient record, so a case moves
                between teams without paperwork delays or repeated tests.
              </p>
            </div>

            <div className="dept-list">
              {departments.map((d) => (
                <div className="dept-row" key={d.title}>
                  <div className="icon">{d.icon}</div>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOCTORS */}
        <section className="about" id="doctors">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="rule-label">
                  <span className="rule" aria-hidden="true"></span>
                  <span>Meet the team</span>
                </div>
                <h2>Doctors</h2>
              </div>
              <p>
                A small selection of the specialists on staff — full department listings are
                shared at the time of booking.
              </p>
            </div>
            <div className="doctors-grid">
              {doctors.map((doc) => (
                <div className="doc-card" key={doc.name}>
                  <div className="avatar" style={{ background: doc.color }}>{doc.initials}</div>
                  <h3>{doc.name}</h3>
                  <div className="role">{doc.role}</div>
                  <p className="bio">{doc.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="process" id="process">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="rule-label">
                  <span className="rule" aria-hidden="true"></span>
                  <span>Getting an appointment</span>
                </div>
                <h2>How booking works</h2>
              </div>
              <p>Three steps, whether it's a routine check-up or a next-day delivery consultation.</p>
            </div>
            <div className="process-steps">
              <div className="step">
                <span className="num">01</span>
                <h3>Tell us what's needed</h3>
                <p>Fill the form below or call the front desk — mention the department and, if known, the doctor you'd prefer.</p>
              </div>
              <div className="step">
                <span className="num">02</span>
                <h3>Get a confirmed slot</h3>
                <p>Our desk calls or messages back within a few hours with a date, time, and which doctor you're seeing.</p>
              </div>
              <div className="step">
                <span className="num">03</span>
                <h3>Visit with your records</h3>
                <p>Bring any past prescriptions, scans, or vaccination cards — it saves repeating tests you've already had.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="reviews">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="rule-label">
                  <span className="rule" aria-hidden="true"></span>
                  <span>From families</span>
                </div>
                <h2>What parents say</h2>
              </div>
              <p></p>
            </div>
          </div>
          <div className="testi-grid">
            <div className="testi">
              <p>"Our daughter was born eight weeks early. The NICU team explained every single day what was happening — nothing felt hidden from us."</p>
              <div className="who">Parent of a NICU patient, 2025</div>
            </div>
            <div className="testi">
              <p>"Same doctor saw my son from his first vaccination to his school fitness check-up. He actually remembers him each visit."</p>
              <div className="who">Parent, Paediatrics</div>
            </div>
            <div className="testi">
              <p>"I was scared about a C-section. Dr. Sharma walked me through it two weeks ahead, so there were no surprises on the day."</p>
              <div className="who">Parent, Maternity ward</div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="rule-label">
                  <span className="rule" aria-hidden="true"></span>
                  <span>Get in touch</span>
                </div>
                <h2>Book a visit</h2>
              </div>
              <p>For emergencies, call the 24×7 line directly rather than using the form.</p>
            </div>

            <div className="contact-grid">
              <div>
                <div className="info-row">
                  <div className="label">Address</div>
                  <div className="val">Nan Care Hospital, Bhagat Singh Circle, Alwar, Rajasthan 301001</div>
                </div>
                <div className="info-row">
                  <div className="label">Phone</div>
                  <div className="val">
                    <a href="tel:+919829000111">+91 98290 00111</a> (24×7 emergency)
                    <br />
                    <a href="tel:+911441234567">+91 144 123 4567</a> (front desk)
                  </div>
                </div>
                <div className="info-row">
                  <div className="label">Email</div>
                  <div className="val"><a href="mailto:care@nan-care.com">care@nan-care.com</a></div>
                </div>
                <div className="info-row">
                  <div className="label">OPD Hours</div>
                  <div className="val">
                    Mon–Sat, 9:00 AM – 7:00 PM
                    <br />
                    Emergency &amp; NICU: open 24 hours
                  </div>
                </div>
              </div>

              <form className="appt" onSubmit={handleSubmit}>
                <div className="two">
                  <div>
                    <label htmlFor="fname">Full name</label>
                    <input id="fname" name="fname" type="text" placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone number</label>
                    <input id="phone" name="phone" type="tel" placeholder="10-digit mobile" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="dept">Department</label>
                  <select id="dept" name="dept" required defaultValue="">
                    <option value="" disabled>Choose a department</option>
                    {departments.map((d) => (
                      <option key={d.title}>{d.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="msg">Anything we should know</label>
                  <textarea id="msg" name="msg" placeholder="Preferred dates, symptoms, or a doctor's name"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Request appointment</button>
                <p className="form-note">{formNote}</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© 2026 Nan Care Hospital, Alwar. All rights reserved.</span>
          <span><a href="#top">Back to top</a></span>
        </div>
      </footer>
    </>
  );
}
